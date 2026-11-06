import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { RouteShell, PageHeadingSkeleton, Pulse, StatCardsSkeleton } from '@/components/loading/skeletons';
import {
  CalendarDays,
  CalendarPlus,
  CloudOff,
  Heart,
  MapPin,
  Plus,
  Wallet,
} from 'lucide-react';
import { auth } from '@/lib/auth';
import { SmartImage } from '@/components/smart-image';
import { headers } from 'next/headers';
import { BACKEND_URL, getBackendAuthHeaders } from '@/lib/backend';

const quickLinks = [
  {
    label: 'Add New Space',
    description: 'List a new studio space',
    icon: Plus,
    href: '/add-destination',
  },
  {
    label: 'My Studio Listings',
    description: 'Edit or remove your uploads',
    icon: CalendarPlus,
    href: '/my-listings',
  },
  {
    label: 'My Bookings',
    description: 'View and cancel your sessions',
    icon: CalendarDays,
    href: '/my-bookings',
  },
  {
    label: 'Saved',
    description: 'Spaces you saved with the heart',
    icon: Heart,
    href: '/saved',
  },
];

const ProfileContent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect('/login?redirect=/profile');
  }

  const user = session.user;

  const authHeaders = await getBackendAuthHeaders(user);

  /* Account overview numbers */
  let listingsCount = 0;
  let bookingsCount = 0;
  let totalSpend = 0;
  let backendError = null;

  try {
    const [destinationsRes, bookingsRes] = await Promise.all([
      fetch(`${BACKEND_URL}/destinations`, {
        headers: authHeaders,
        cache: 'no-store',
      }),
      fetch(`${BACKEND_URL}/bookings/${encodeURIComponent(user.email)}`, {
        headers: authHeaders,
        cache: 'no-store',
      }),
    ]);

    if (!destinationsRes.ok || !bookingsRes.ok) {
      backendError = `http-${!destinationsRes.ok ? destinationsRes.status : bookingsRes.status}`;
    } else {
      const destinations = await destinationsRes.json();
      const bookings = await bookingsRes.json();

      if (Array.isArray(destinations)) {
        // Same visibility rule as /my-listings: studios with no owner
        // plus studios this user added
        const email = String(user.email || '').trim().toLowerCase();
        listingsCount = destinations.filter(
          (destination) =>
            !destination?.userEmail ||
            String(destination.userEmail).trim().toLowerCase() === email
        ).length;
      }

      if (Array.isArray(bookings)) {
        bookingsCount = bookings.length;
        totalSpend = bookings.reduce(
          (sum, booking) => sum + (Number(booking.price) || 0),
          0
        );
      }
    }
  } catch (error) {
    backendError = 'unreachable';
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-normal text-foreground sm:text-4xl">
          Profile
        </h1>
        <p className="mt-3 text-sm text-foreground/70">
          Your account details and quick actions
        </p>

        {backendError ? (
          <div
            role="alert"
            className="mt-6 flex items-center gap-3 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/5 dark:text-amber-300"
          >
            <CloudOff className="size-4 shrink-0" aria-hidden />
            <span>
              Live data is temporarily unavailable — bookings and listings may
              show as zero. Your account is fine; this is a connection problem.
            </span>
          </div>
        ) : null}

        {/* Profile card */}
        <div className="mt-10 flex flex-col items-center gap-6 border border-[#e3e7ec] bg-white p-8 text-center sm:flex-row sm:text-left">
          {/* Avatar */}
          {user.image ? (
            <SmartImage
              src={user.image}
              alt={user.name || 'User'}
              width={96}
              height={96}
              referrerPolicy="no-referrer"
              className="size-24 shrink-0 rounded-full border border-border object-cover"
            />
          ) : (
            <span className="flex size-24 shrink-0 items-center justify-center rounded-full bg-[#e61a4f] text-4xl font-bold text-white">
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          )}

          {/* Name + email */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">
              {user.name || 'User'}
            </h2>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-foreground/70 sm:justify-start">
              <MapPin className="size-3.5 text-[#e61a4f]" aria-hidden />
              {user.email}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="border border-[#e3e7ec] bg-white p-5 text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-foreground/50">
              Listings Added
            </p>
            <p className="mt-1 text-3xl font-bold text-[#e61a4f]">
              {listingsCount}
            </p>
          </div>

          <div className="border border-[#e3e7ec] bg-white p-5 text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-foreground/50">
              Total Bookings
            </p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {bookingsCount}
            </p>
          </div>

          <div className="border border-[#e3e7ec] bg-white p-5 text-center">
            <p className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wide text-foreground/50">
              <Wallet className="size-3.5" aria-hidden />
              Total Spend
            </p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              ${totalSpend}
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <h3 className="mt-10 text-lg font-bold text-foreground">
          Quick Actions
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {quickLinks.map(({ label, description, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-center gap-4 border border-[#e3e7ec] bg-white p-5 transition-all hover:border-[#e61a4f]/50 hover:shadow-md"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#e61a4f]/10 text-[#e61a4f]">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block font-bold text-foreground">
                  {label}
                </span>
                <span className="block text-sm text-foreground/60">
                  {description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

/* Suspense boundary — dynamic fetch shows the shared skeleton */
export default function Page() {
  return (
    <Suspense
      fallback={
        <RouteShell maxWidth="max-w-5xl">
          <PageHeadingSkeleton />
          <div className="mt-10 flex items-center gap-6 border border-[#e3e7ec] bg-white p-8">
            <Pulse className="size-24 shrink-0 rounded-full" />
            <div className="space-y-3">
              <Pulse className="h-6 w-40" />
              <Pulse className="h-4 w-56" />
            </div>
          </div>
          <div className="mt-6">
            <StatCardsSkeleton />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((index) => (
              <Pulse key={index} className="h-24" />
            ))}
          </div>
        </RouteShell>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
