import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import { SmartImage } from "@/components/smart-image";
import { SaveButton } from "@/components/saved/save-button";

export function DestinationCard({ destination }) {
  const { _id, name, country, price, duration, imageUrl } = destination;

  return (
    <article className="group flex flex-col">
      {/* Image + rating badge */}
      <Link
        href={`/destinations/${_id}`}
        className="relative block aspect-[19/10] w-full overflow-hidden bg-[#eef7f8]"
      >
        <SmartImage
          src={imageUrl}
          alt={name}
          fill
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <SaveButton destinationId={_id} />
        <span className="absolute right-3 top-3 flex items-center gap-1 bg-white/95 px-2.5 py-1 text-xs font-semibold text-foreground">
          4.5
          <Star className="size-3 fill-foreground text-foreground" aria-hidden />
        </span>
      </Link>

      {/* Details */}
      <div className="mt-3 flex flex-1 flex-col">
        <p className="flex items-center gap-1 text-xs text-foreground/60">
          <MapPin className="size-3.5 text-cyan-600" aria-hidden />
          {country}
        </p>

        <div className="mt-0.5 flex items-baseline justify-between gap-2">
          <h3 className="text-[19px] leading-snug text-foreground">{name}</h3>
          <p className="shrink-0">
            <span className="text-lg font-bold text-foreground">${price}</span>
            <span className="text-[10px] text-foreground/60">/Session</span>
          </p>
        </div>

        <p className="mt-0.5 flex items-center gap-1 text-xs text-foreground/60">
          <CalendarDays className="size-3.5 text-cyan-600" aria-hidden />
          {duration}
        </p>

        <Link
          href={`/destinations/${_id}`}
          className="mt-2 inline-flex items-center gap-1 self-start text-xs font-bold uppercase tracking-wide text-cyan-600 underline decoration-cyan-600/70 underline-offset-4 transition-colors hover:text-cyan-700"
        >
          Rent Now
          <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
