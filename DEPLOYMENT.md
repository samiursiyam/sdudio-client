# Vercel-এ Deploy করার সম্পূর্ণ গাইড

Sale, saved data আর login কেন কাজ করছে — সংক্ষিপ্ত উত্তর হলো: **Express backend (`:5000`) Vercel-এ নেই**। Vercel/serverless থেকে `localhost:5000` এ পৌঁছানো অসম্ভব, তাই booking/saved data লোড হচ্ছিল না। নিচের ধাপগুলো অনুসরণ করলে সব ঠিক হয়ে যাবে।

---

## ১. প্রথমে Backend deploy করতে হবে (বাধ্যতামূলক)

তোমার Express + MongoDB backend টা একটা public URL-এ deploy করতে হবে। ফ্রি অপশন:

- **Render** (render.com) — "Web Service", free tier
- **Railway** (railway.app)
- অথবা যেকোনো VPS

Backend deploy করার সময় সেখানে এই environment variables দিতে হবে:

| Variable | Value |
|---|---|
| `MONGODB_URL` | তোমার MongoDB Atlas connection string |
| `PORT` | Render নিজে সেট করে দেয় — কোড `process.env.PORT` পড়লেই হবে |
| `FRONTEND_URL` | `https://<তোমার-vercel-app>.vercel.app` (যদি CORS config থাকে backend-এ) |

> **MongoDB Atlas** ব্যবহার করলে Network Access → `0.0.0.0/0` allow করতে হবে, নাহলে Atlas কানেকশন refuse করবে।

Backend deploy হলে একটা URL পাবে, যেমন: `https://studio-ora-api.onrender.com`

সেটা টেস্ট করো:

```
curl https://studio-ora-api.onrender.com/destinations
```

JSON list আসলে backend ঠিক আছে।

---

## ২. Vercel-এ Environment Variables সেট করো

Vercel → তোমার Project → **Settings → Environment Variables**:

| Variable | Value (উদাহরণ) |
|---|---|
| `SERVER_URL` | `https://studio-ora-api.onrender.com` |
| `BETTER_AUTH_URL` | `https://studio-ora.vercel.app` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | `https://studio-ora.vercel.app` |
| `BETTER_AUTH_SECRET` | তোমার production secret (dev-এর secret হুবহু ব্যবহার না করাই ভালো) |
| `MONGODB_URL` | Atlas connection string |
| `NEXT_PUBLIC_SERVER_URL` | (ঐচ্ছিক — browser এখন আর এটা ব্যবহার করে না; `/backend/*` proxy ব্যবহার করে) |

সেট করার পর **Redeploy** করতে হবে (Deployments → Redeploy) — env var পরিবর্তন build-এ প্রবেশ করে।

---

## ৩. Backend-এর JWT verifier production-এর জন্য বদলাও

Backend যখন JWT verify করে (`jose` দিয়ে), সেখানে **issuer/audience/JWKS** URL গুলো localhost-এ হার্ডকোড করা থাকলে production login কাজ করবে না। Backend repo-তে:

```js
// আগে (dev):
const JWKS = createRemoteJWKSet(new URL('http://localhost:3000/api/auth/jwks'));
issuer: 'http://localhost:3000',
audience: 'http://localhost:3000',

// পরে (production):
const JWKS = createRemoteJWKSet(new URL('https://studio-ora.vercel.app/api/auth/jwks'));
issuer: 'https://studio-ora.vercel.app',
audience: 'https://studio-ora.vercel.app',
```

সবচেয়ে ভালো: এগুলো env var থেকে পড়ো (যেমন `FRONTEND_URL`), তাহলে dev আর prod একই কোড-এ চলে।

> `https://studio-ora.vercel.app` এর জায়গায় তোমার **আসল** Vercel domain (বা custom domain) বসাও। `issuer`/`audience` অবশ্যই `BETTER_AUTH_URL`-এর সাথে হুবহু মিলতে হবে।

---

## ৪. Frontend কীভাবে কাজ করে

- **Browser → backend সরাসরি যায় না।** Browser সবসময় same-origin `https://yourapp.vercel.app/backend/...` কল করে, আর `next.config.mjs` সেটাকে `${SERVER_URL}/...`-এ rewrite করে দেয়।
  - ✅ CORS লাগবে না
  - ✅ Backend URL browser bundle-এ প্রকাশ পায় না
  - ✅ Authorization (Bearer) header হুবহু backend পর্যন্ত পৌঁছায়
- **Server components** (`/my-bookings`, `/my-listings`, `/profile`, এবং home/… সব public pages) সরাসরি `${SERVER_URL}` থেকে fetch করে (server-side, cached ৩০ সেকেন্ড)।
- Backend unreachable হলে এখন আর চুপচাপ "No bookings found" দেখায় না — একটা **"We can't reach the server"** card + "Try again" button দেখায় (profile-এ একটা warning banner দেখায়)। তাই deploy-র পর কোনো page ভেঙে গেলে চোখে পড়া যাবে।

---

## ৫. Deploy-পর checklist

1. `https://<app>.vercel.app/destinations` — studio list দেখা যাচ্ছে?
2. Sign up / login কাজ করছে? (cookie set হচ্ছে কিনা DevTools → Application → Cookies-এ দেখো)
3. একটা studio book করো → `/my-bookings`-এ দেখা যাচ্ছে? তা না হলে backend console-এ JWT error চেক করো (ধাপ ৩)
4. Saved heart চাপো → `/saved`-এ দেখা যাচ্ছে? (saved page এখন backend call **করেই না** — তাই এটা সবসময় কাজ করবে)
5. `/any-random-url` — নতুন custom 404 page দেখাচ্ছে?
6. Slow network-এ page navigate করলে branded loading screen / skeleton দেখাচ্ছে?

---

## ৬. যেসব সমস্যা এখনও হলে

| লক্ষণ | কারণ | সমাধান |
|---|---|---|
| সব page-এ "can't reach the server" | `SERVER_URL` ভুল / backend ডাউন | ধাপ ১ ও ২ চেক করো; `curl <SERVER_URL>/destinations` |
| Login হয়, কিন্তু booking/my-listings data নেই | Backend JWKS/iss/aud localhost-এ | ধাপ ৩ |
| Images ভাঙা / অপ্টিমাইজ হয় না | Backend host `remotePatterns`-এ নেই | এটা এখন অটো — `next.config.mjs` `SERVER_URL` থেকে host পড়ে; তবু না হলে SmartImage fallback unoptimized হিসেবে কাজ করবে, পেজ ভাঙবে না |
| Login নিজেই ব্যর্থ | `BETTER_AUTH_URL` সঠিক সেট হয়নি | Vercel env চেক করে redeploy |
