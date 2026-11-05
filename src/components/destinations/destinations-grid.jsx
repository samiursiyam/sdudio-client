"use client";

import { useState } from "react";
import { Plane } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DestinationCard } from "@/components/destinations/destination-card";

const priceRanges = [
  { value: "under-1000", label: "Under $1000", test: (price) => price < 1000 },
  {
    value: "1000-3000",
    label: "$1000 - $3000",
    test: (price) => price >= 1000 && price <= 3000,
  },
  { value: "3000-plus", label: "$3000+", test: (price) => price > 3000 },
];

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export function DestinationsGrid({ destinations }) {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  const uniqueCategories = [...new Set(destinations.map((d) => d.category))];

  const filtered = destinations
    .filter((destination) => {
      if (category !== "all" && destination.category !== category) return false;
      if (priceRange === "all") return true;
      const price = Number(destination.price) || 0;
      return priceRanges.find((r) => r.value === priceRange).test(price);
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return (Number(a.price) || 0) - (Number(b.price) || 0);
      if (sortBy === "price-desc") return (Number(b.price) || 0) - (Number(a.price) || 0);
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <>
      {/* Filter bar — one continuous bar, internal dividers */}
      <div className="mt-6 grid grid-cols-1 divide-y divide-[#e3e7ec] border border-[#e3e7ec] bg-white sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-11 w-full justify-between gap-3 rounded-none border-0 bg-white px-5 text-xs font-medium uppercase tracking-wide text-foreground/60 hover:bg-[#fafbfc]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {uniqueCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className="h-11 w-full justify-between gap-3 rounded-none border-0 bg-white px-5 text-xs font-medium uppercase tracking-wide text-foreground/60 hover:bg-[#fafbfc]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Price</SelectItem>
            {priceRanges.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-11 w-full justify-between gap-3 rounded-none border-0 bg-white px-5 text-xs font-medium uppercase tracking-wide text-foreground/60 hover:bg-[#fafbfc]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Recommended</SelectItem>
            {sortOptions.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Result count */}
      <p className="mt-5 text-sm text-foreground/70">
        Showing {filtered.length} space{filtered.length === 1 ? "" : "s"}
      </p>

      {/* Cards grid */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      ) : (
        <AnimatedEmptyState />
      )}
    </>
  );
}

function AnimatedEmptyState() {
  return (
    <div className="mt-4 flex flex-col items-center rounded-md border border-dashed border-[#d9e6ea] bg-[#fbfdfe] px-6 py-20 text-center">
      {/* Pulsing plane badge */}
      <div className="relative flex size-24 items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 animate-ping rounded-full bg-cyan-300/40"
          style={{ animationDuration: "2.4s" }}
        />
        <span
          aria-hidden
          className="absolute inset-2 animate-ping rounded-full bg-cyan-400/30"
          style={{ animationDuration: "2.4s", animationDelay: "800ms" }}
        />
        <span className="relative flex size-16 items-center justify-center rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/30">
          <Plane className="size-7" aria-hidden />
        </span>
      </div>

      <h3 className="mt-7 text-xl font-medium text-foreground">No Data Found</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground/60">
        New studios will appear here as soon as they are added. Try
        adjusting the filters or check back a little later.
      </p>

      {/* Bouncing dots */}
      <div className="mt-6 flex items-center gap-1.5" aria-hidden>
        <span className="size-2 animate-bounce rounded-full bg-cyan-500/80" style={{ animationDelay: "0ms" }} />
        <span className="size-2 animate-bounce rounded-full bg-cyan-500/80" style={{ animationDelay: "150ms" }} />
        <span className="size-2 animate-bounce rounded-full bg-cyan-500/80" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
