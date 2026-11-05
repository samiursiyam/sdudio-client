import { authClient } from "@/lib/auth-client";

/* Fetch a JWT for the external backend (Express on :5000).
   Returns null when the user is logged out or the token
   can't be reached — never throws, so callers can always
   fall back to an unauthenticated request. */
export const getJwtToken = async () => {
  try {
    const { data } = await authClient.token();
    return data?.token ?? null;
  } catch {
    return null;
  }
};

/* Spread helper: adds Authorization only when a token exists */
export const bearer = (token) =>
  token ? { Authorization: `Bearer ${token}` } : {};
