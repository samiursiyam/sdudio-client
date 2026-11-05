import Link from 'next/link';
import { DestinationCard } from '@/components/destinations/destination-card';
import { getDestinations } from '@/lib/destinations-server';

/* Server-rendered — destinations arrive with the first HTML from one
   cached fetch, no client-side skeleton + request waterfall */
export default async function CategoriesPage({ searchParams }) {
  const { category } = await searchParams;
  const destinations = await getDestinations();

  /* Open with the category passed in the URL (?category=Photo Studio) */
  const active = category || 'All';

  /* Category tabs — "All" first, then every category found in the data */
  const categories = [
    'All',
    ...Array.from(
      new Set(destinations.map((item) => item.category).filter(Boolean))
    ),
  ];

  /* Selected category determines which cards are shown */
  const filtered =
    active === 'All'
      ? destinations
      : destinations.filter((item) => item.category === active);

  const countFor = (tab) =>
    tab === 'All'
      ? destinations.length
      : destinations.filter((item) => item.category === tab).length;

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-normal text-foreground sm:text-4xl">
          Browse by Category
        </h1>
        <p className="mt-3 text-sm text-foreground/70">
          Pick a category to see the trips that belong to it
        </p>

        {/* Category tabs */}
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((tab) =>
            tab === active ? (
              <button
                key={tab}
                type="button"
                className="rounded-full px-5 py-2 text-sm font-semibold transition-colors bg-[#e61a4f] text-white"
              >
                {tab}
                <span className="ml-2 text-xs opacity-70">{countFor(tab)}</span>
              </button>
            ) : (
              <Link
                key={tab}
                href={
                  tab === 'All'
                    ? '/categories'
                    : `/categories?category=${encodeURIComponent(tab)}`
                }
                className="rounded-full px-5 py-2 text-sm font-semibold transition-colors border border-[#e3e7ec] text-foreground/70 transition-colors hover:border-[#e61a4f]/60 hover:text-foreground"
              >
                {tab}
                <span className="ml-2 text-xs opacity-70">{countFor(tab)}</span>
              </Link>
            )
          )}
        </div>

        {/* Cards — "All" shows everything, otherwise only that category */}
        {filtered.length === 0 ? (
          <div className="mt-10 border border-[#e3e7ec] bg-white p-10 text-center">
            <p className="text-lg font-medium text-foreground">
              No destinations in this category
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
