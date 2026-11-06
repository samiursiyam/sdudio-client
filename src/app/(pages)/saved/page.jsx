import { getDestinations } from '@/lib/destinations-server';
import { SavedClient } from '@/components/saved/saved-client';

export const metadata = {
  title: 'Saved Spaces',
  description: 'Studio spaces you saved with the heart button',
};

/* Server component — destinations come from the cached server fetch,
   localStorage filtering happens in the client island, so the browser
   never calls the backend directly (works on any deployment) */
export default async function SavedPage() {
  const destinations = await getDestinations();

  return <SavedClient destinations={destinations} />;
}
