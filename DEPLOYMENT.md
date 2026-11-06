# Vercel-এ Deploy করার সম্পূর্ণ গাইড

## সংক্ষিপ্ত উত্তর: কেন booking কাজ করছিল না?

দুটি আলাদা কারণ ছিল:

1. **Vercel/serverless থেকে `localhost:5000` এ পৌঁছানো সম্ভব না** — তাই production-এ ডেটা লোড হচ্ছিল না। Backend-টা অবশ্যই public URL-এ deploy থাকতে হবে, আর Vercel-এ `SERVER_URL` সেদিকে point করতে হবে।
2. **দুটি Vercel app (frontend + backend) এর মধ্যে JWT verify হচ্ছিল না** — backend `BETTER_AUTH_URL`/`BETTER_AUTH_JWKS_URL` দিয়ে frontend-এর JWKS fetch করে iss/aud মেলানোর চেষ্টা করছিল; environment mismatch-এ সেটা ব্যর্থ হয়ে `401 "Invalid or expired token"` আসতো।

এখন এই সিস্টেম **তিন-স্তরের** — এর যেকোনো একটি কাজ করলেই booking হবে:

| স্তর | কীভাবে কাজ করে | কখন সক্রিয় |
|---|---|---|
| ① `x-internal-secret` **(primary)** | Browser → `/backend/*` (same-origin) → Next.js session verify করে → backend-এ `x-internal-secret` + `x-user-*` headers পাঠায় | `INTERNAL_API_SECRET` দুটি Vercel project-এই set থাকলে |
| ② JWKS Bearer **(fallback)** | Browser → `/backend/*` → proxy session থেকে Bearer JWT বানিয়ে backend-এ পাঠায় → backend frontend-এর JWKS দিয়ে verify করে | `INTERNAL_API_SECRET` set না থাকলে |
| ③ সরাসরি Bearer | curl/external tool দিয়ে সরাসরি backend-এ | সবসময় (যদি JWKS config সঠিক থাকে) |

> ① স্তর **JWKS-এর ওপর মোটেও নির্ভর করে না** — তাই দুটি app-এর env mismatch-এ আর কখনো 401 আসবে না।
> Browser আর কখনো token দেখেই না — সব কিছু server-side।

---

## ১. Backend deploy করতে হবে (বাধ্যতামূলক)

`wonderlsat-server` টা তোমার Vercel project **"studeio"** হিসেবে deploy (`vercel --prod` চললেই হবে, অথবা GitHub push → auto deploy)। Backend-এ এই env vars (Production + Preview, দুটোই) set থাকতে হবে:

| Variable | Value |
|---|---|
| `MONGODB_URL` | MongoDB Atlas connection string |
| `BETTER_AUTH_URL` | `https://studeo-client.vercel.app` |
| `BETTER_AUTH_JWKS_URL` | `https://studeo-client.vercel.app/api/auth/jwks` |
| `INTERNAL_API_SECRET` | frontend-এর সাথে **একই** secret (নিচে ২-এ দেখো) |

> **MongoDB Atlas** → Network Access → `0.0.0.0/0` allow করতে হবে।

টেস্ট করো: `curl https://<backend-url>/destinations` → JSON list আসলে ঠিক আছে।

---

## ২. দুটি Vercel project-এই `INTERNAL_API_SECRET` set করো (একই মান)

এটাই **সবচেয়ে গুরুত্বপূর্ণ**। Frontend আর backend দুটোতেই হুবহু এক secret দিতে হবে:

```bash
# frontend (studeo-client)
vercel env add INTERNAL_API_SECRET production
vercel env add INTERNAL_API_SECRET preview

# backend (studeio)
vercel env add INTERNAL_API_SECRET production
vercel env add INTERNAL_API_SECRET preview
```

Secret generate করতে:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> এই secret শুধু server-side (Vercel serverless functions)-এ থাকে —
> browser bundle-এ কখনো যায় না। `.gitignore`-এ `.env` আছে, secret কোথাও commit হয় না।

✅ **আমি ইতিমধ্যে দুটি project-এই `INTERNAL_API_SECRET` set করে দিয়েছি (Production + Preview)।**
শুধু মনে রেখো: env var শুধু **পরের deployment-এ** কার্যকর হয়।

---

## ৩. Frontend Vercel env (studeo-client)

| Variable | Value |
|---|---|
| `SERVER_URL` | backend-এর URL (যেমন `https://studeio.vercel.app`) |
| `BETTER_AUTH_URL` | `https://studeo-client.vercel.app` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | `https://studeo-client.vercel.app` |
| `BETTER_AUTH_SECRET` | production secret |
| `MONGODB_URL` | Atlas connection string |
| `INTERNAL_API_SECRET` | ✅ set (আমি করে দিয়েছি) |
| `NEXT_PUBLIC_SERVER_URL` | (অপ্রয়োজনীয় — রাখা আছে legacy হিসেবে) |

---

## ৪. Deploy-র পর checklist

1. `curl https://<backend>/destinations` → 200
2. Site-এ `/destinations` → data দেখাচ্ছে?
3. Login → studio book → `/my-bookings`-এ **দেখা যাচ্ছে?** (এটাই আগে fail করত)
4. `/saved` → heart দিয়ে save → list-এ আসছে?
5. Logout → `/my-bookings` → `/login`-এ redirect হচ্ছে?
6. ভুল URL → custom 404 page দেখাচ্ছে?

যেকোনো step fail হলে Vercel → Deployments → Functions → Logs দেখো।

---

## ৫. কীভাবে কাজ করে (architecture)

```
Browser  ──GET/POST /backend/*──▶  Next.js (Vercel)
   │                                 │
   │                                 ├─ 1) better-auth session verify
   │                                 ├─ 2) 401 যদি mutation হয়, session নেই
   │                                 ├─ 3) x-internal-secret + x-user-email
   │                                 │      + x-user-id + x-user-name
   ◀──────────  response  ───────────┤
                                    ▼
                        Express backend (Vercel)
                                    │
                        secret match → verified identity (JWKS ছাড়াই)
                        নাহলে → JWKS Bearer fallback
```

**Security notes**

- `GET /bookings/<email>` — এখন **প্রোফাইলে লকড**: নিজের bookings ছাড়া কারো bookings দেখা যাবে না (403)। আগে এটা public ছিল!
- `POST /bookings`, `POST /add-destination` — `userEmail` body থেকে নেওয়া **হয় না**; verified session থেকে নেওয়া হয় (spoofing বন্ধ)।
- Server-side duplicate guard: একই studio দুইবার book করা যাবে না (409) — double-click protection-ও।
- `DELETE /my-bookings/:id` — শুধু নিজের booking cancel করা যাবে (ownership check)।
- Unauthenticated mutation → proxy তেই 401।
- Booking data এখন আর browser/অন্য user-এর কাছে ফাঁস হয় না।

---

## ৬. Local development

`.env` (frontend) এবং `wonderlsat-server/.env` — দুই জায়গাতেই:

```
INTERNAL_API_SECRET=<same 64-char hex>
```

✅ দুটোতেই local-এ set করে দিয়েছি। Local backend restart দরকার হলে:

```bash
cd ../wonderlsat-server
node index.js
```
