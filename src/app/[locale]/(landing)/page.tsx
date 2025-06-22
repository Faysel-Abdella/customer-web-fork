import Footer from "@/components/Footer";

import Features from "./_components/Features";
import Hero from "./_components/Hero";
import PopularItems from "./_components/PopularItems";
import PopularRestaurants from "./_components/PopularRestaurants";
import SpecialFood from "./_components/SpecialFood";
import Testimonials from "./_components/Testimonials";

export default function HomePage() {
  return (
    <div className="">
      <Hero />
      <PopularItems />
      <PopularRestaurants />
      <Features />
      <SpecialFood />
      <Testimonials />
      <Footer />
    </div>
  );
}
