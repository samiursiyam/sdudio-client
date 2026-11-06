import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

/* Shared backend (Express) helpers — server-side only.
   The browser NEVER calls the backend directly; it goes through the
   same-origin /backend proxy route handler, which re-asserts the
   verified session identity with these same headers. */

/* Base URL of the Express backend (server-side fetch target) */
export const BACKEND_URL = (
  process.env.SERVER_URL || 'http://localhost:5000'
).replace(/\/+$/, '');

/* Headers that prove a verified identity to the backend.
   - When INTERNAL_API_SECRET is set (recommended, required in prod),
     the secret + x-user-* headers are sent — the backend trusts them
     after a timing-safe comparison, and JWKS is never involved.
   - Otherwise falls back to the better-auth EdDSA Bearer token,
     which the backend verifies against the frontend's JWKS. */
export function backendAuthHeaders(user, token) {
  const headers = {};

  if (process.env.INTERNAL_API_SECRET && user?.email) {
    headers['x-internal-secret'] = process.env.INTERNAL_API_SECRET;
    headers['x-user-email'] = String(user.email).trim().toLowerCase();
    headers['x-user-id'] = String(user.id || '');
    headers['x-user-name'] = String(user.name || '');
  } else if (token) {
    headers['authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/* One-call helper for server components — picks the secret path when
   INTERNAL_API_SECRET is set, otherwise fetches the better-auth
   Bearer token (used by the backend's JWKS fallback) */
export async function getBackendAuthHeaders(user) {
  if (process.env.INTERNAL_API_SECRET) {
    return backendAuthHeaders(user, null);
  }

  try {
    const tokenData = await auth.api.getToken({ headers: await headers() });
    return backendAuthHeaders(user, tokenData?.token);
  } catch {
    return backendAuthHeaders(user, null);
  }
}
