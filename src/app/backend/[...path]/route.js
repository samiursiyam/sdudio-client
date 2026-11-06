import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { BACKEND_URL, backendAuthHeaders } from '@/lib/backend';

/* Same-origin proxy to the Express backend.
   The browser calls /backend/*; this handler verifies the better-auth
   session server-side and re-asserts the identity to the backend with
   `x-internal-secret` + `x-user-*` (and a Bearer fallback). The browser
   never sees the token and the backend URL stays private. */

const SAFE_METHODS = new Set(['GET', 'HEAD']);

async function proxy(request, ctx) {
  const { path } = await ctx.params;
  const pathParts = Array.isArray(path) ? path : [path].filter(Boolean);
  const targetPath = pathParts.map(encodeURIComponent).join('/');
  const target = `${BACKEND_URL}/${targetPath}${new URL(request.url).search}`;

  const incomingHeaders = await headers();
  const session = await auth
    .api
    .getSession({ headers: incomingHeaders })
    .catch(() => null);
  const user = session?.user || null;

  // Unauthenticated mutations are rejected right here — the backend
  // would reject them anyway, and this avoids leaking which routes exist
  if (!SAFE_METHODS.has(request.method) && !user) {
    return Response.json(
      { success: false, message: 'Authentication required' },
      { status: 401 },
    );
  }

  // Bearer fallback (used only when INTERNAL_API_SECRET is not set)
  let token = null;
  if (!process.env.INTERNAL_API_SECRET && user) {
    token = await auth
      .api
      .getToken({ headers: incomingHeaders })
      .then((d) => d?.token || null)
      .catch(() => null);
  }

  // Build the outgoing headers — never forward the browser's
  // cookies/authorization, we mint our own credentials
  const outgoing = {
    accept: request.headers.get('accept') || 'application/json',
    ...backendAuthHeaders(user, token),
  };

  const contentType = request.headers.get('content-type');
  if (contentType) {
    outgoing['content-type'] = contentType;
  }

  const init = {
    method: request.method,
    headers: outgoing,
    cache: 'no-store',
    redirect: 'manual',
  };

  if (!SAFE_METHODS.has(request.method)) {
    const body = await request.text();
    if (body) init.body = body;
  }

  let backendRes;
  try {
    backendRes = await fetch(target, init);
  } catch {
    return Response.json(
      {
        success: false,
        message: 'Backend is unreachable. Please try again in a moment.',
      },
      { status: 503 },
    );
  }

  // Stream the backend's response back untouched (status + body)
  const responseHeaders = new Headers();
  const contentTypeOut = backendRes.headers.get('content-type');
  if (contentTypeOut) responseHeaders.set('content-type', contentTypeOut);
  responseHeaders.set('cache-control', 'no-store');

  return new Response(backendRes.body, {
    status: backendRes.status,
    statusText: backendRes.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
