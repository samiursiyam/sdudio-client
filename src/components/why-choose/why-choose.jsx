import Image from "next/image";

const features = [
  {
    icon: "/image/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Every space is verified and well-maintained — book with confidence with 24/7 support.",
  },
  {
    icon: "/image/MapTrifold.png",
    title: "Perfect Match",
    description:
      "Local experts who help you find the right studio for every kind of project.",
  },
  {
    icon: "/image/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you before, during and after your session.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-[#dff1f5] py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section heading */}
        <div className="text-center">
          <h2 className="text-3xl font-medium text-foreground sm:text-4xl lg:text-[42px] lg:leading-tight">
            Why Choose Wanderlust
          </h2>
          <p className="mt-2 text-sm text-foreground/60 sm:text-base">
            Your trusted partner for exceptional creative spaces
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon, title, description }) => (
            <div key={title} className="bg-white px-6 py-8 sm:px-7">
              <Image src={icon} alt="" width={32} height={32} className="h-8 w-8" />
              <h3 className="mt-6 text-xl font-normal text-foreground sm:text-2xl">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
