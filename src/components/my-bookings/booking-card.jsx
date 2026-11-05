import Link from 'next/link';
import { CalendarDays, CheckCircle2, Clock, Eye, MapPin } from 'lucide-react';
import { CancelBooking } from '@/components/my-bookings/cancel-booking';
import { SmartImage } from '@/components/smart-image';

const STATUS_STYLES = {
  confirmed: {
    label: 'Confirmed',
    icon: CheckCircle2,
    className: 'bg-emerald-50 text-emerald-600',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'bg-amber-50 text-amber-600',
  },
};

const formatDate = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

export function BookingCard({ booking }) {
  const { _id, name, imageUrl, price, departureDate, status } = booking;

  const badge =
    STATUS_STYLES[status?.toLowerCase()] ?? STATUS_STYLES.confirmed;
  const BadgeIcon = badge.icon;

  return (
    <article className="flex flex-col overflow-hidden border border-[#e3e7ec] bg-white transition-all duration-300 ease-out sm:flex-row">
      {/* Image */}
      <div className="shrink-0 bg-white p-0 sm:h-auto sm:w-72 sm:p-4 sm:pr-0">
        <div className="relative h-44 w-full overflow-hidden bg-[#eef7f8] sm:h-44 sm:w-full">
        <SmartImage
          src={imageUrl}
          alt={name}
          fill
          sizes="288px"
          className="object-cover"
        />
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${badge.className}`}
        >
          <BadgeIcon className="size-3.5" aria-hidden />
          {badge.label}
        </span>

        <h3 className="mt-3 text-2xl font-normal text-foreground">{name}</h3>

        <div className="mt-2.5 space-y-1.5 text-sm text-foreground/60">
          <p className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-cyan-600" aria-hidden />
            Session: {formatDate(departureDate)}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-cyan-600" aria-hidden />
            Booking ID: {_id}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5 sm:pt-6">
          <p className="text-3xl font-bold text-cyan-600">${price}</p>

          <div className="flex items-center gap-3">
            <CancelBooking bookingId={_id} />
            <Link
              href={`/destinations/${booking.destinationId}`}
              className="flex items-center gap-1.5 bg-cyan-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-700"
            >
              <Eye className="size-3.5" aria-hidden />
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
