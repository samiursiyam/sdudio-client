import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="relative flex min-h-[380px] items-center justify-center overflow-hidden sm:min-h-[470px]">
      {/* Background image */}
      <Image
        src="/image/CTA.png"
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        className="-z-10 object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-black/25" />

      {/* CTA copy */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center sm:px-6">
        <h2 className="text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
          Ready To Start Your Session?
        </h2>
        <p className="mt-3 text-base text-white/90 sm:mt-4 sm:text-lg">
          Join thousands of creators who produce great work with us
        </p>
        <a
          href="#book"
          className="mt-8 flex h-14 items-center gap-4 bg-white px-8 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-cyan-50 sm:px-12"
        >
          Rent Your Studio Today
          <ArrowRight className="size-5" aria-hidden />
        </a>
      </div>
    </section>
  );
}
