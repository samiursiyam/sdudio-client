import { Navbar } from "@/components/navbar/navbar";
import { Banner } from "@/components/banner/banner";
import { CategoriesShowcase } from "@/components/categories/categories-showcase";
import { FeaturedDestinations } from "@/components/destinations/featured-destinations";
import { DestinationShowcase } from "@/components/destinations/destination-showcase";
import { EquipmentShowcase } from "@/components/equipment/equipment-showcase";
import { HowItWorks } from "@/components/how-it-works/how-it-works";
import { AboutStudio } from "@/components/about/about-studio";
import { AboutUs } from "@/components/about/about-us";
import { ContactUs } from "@/components/contact/contact-us";
import { getDestinations } from "@/lib/destinations-server";

/* One cached fetch (revalidates every 30s) shared by every
   section below instead of three separate client-side requests */
export default async function Home() {
  const destinations = await getDestinations();

  return (
    <main className="flex min-h-[calc(100vh-72px)] flex-1 flex-col">
      <Banner />
      <CategoriesShowcase />
      <FeaturedDestinations destinations={destinations} />
      <DestinationShowcase destinations={destinations} />
      <EquipmentShowcase />
      <HowItWorks />
      <AboutStudio />
      <AboutUs />
      <ContactUs />
    </main>
  );
}
