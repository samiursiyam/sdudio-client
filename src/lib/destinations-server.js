import { cache } from 'react';

const API_URL = process.env.SERVER_URL;

const FETCH_OPTIONS = {
  /* Cache the response for 30s so repeated visits and multiple
     components on one page don't re-hit the backend */
  next: { revalidate: 30 },
};

/* All destinations — cached + deduped across the layout and every
   component that needs it within the same request */
export const getDestinations = cache(async () => {
  try {
    const res = await fetch(`${API_URL}/destinations`, FETCH_OPTIONS);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    /* Backend unreachable — render the empty state */
    return [];
  }
});

/* One destination by id — same caching as the list */
export const getDestination = cache(async (id) => {
  try {
    const res = await fetch(
      `${API_URL}/destination/${id}`,
      FETCH_OPTIONS
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.result ?? data;
  } catch {
    return null;
  }
});
