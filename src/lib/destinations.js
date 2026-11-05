/* Pure helpers shared by server and client components */

/* Newest-first order: prefer createdAt, fall back to the MongoDB
   ObjectId timestamp (ObjectIds start with a 4-byte creation timestamp) */
export const createdTime = (destination) => {
  if (destination?.createdAt) {
    const time = Date.parse(destination.createdAt);
    if (!Number.isNaN(time)) return time;
  }
  return parseInt(String(destination?._id).substring(0, 8), 16) * 1000 || 0;
};

export const sortNewestFirst = (list) =>
  [...(Array.isArray(list) ? list : [])].sort(
    (a, b) => createdTime(b) - createdTime(a)
  );
