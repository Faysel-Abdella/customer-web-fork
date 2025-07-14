import { Suspense } from "react";

import Features from "./_components/Features";
import Hero from "./_components/Hero";
import PopularItems from "./_components/PopularItems";
import PopularRestaurants from "./_components/PopularRestaurants";
import PopularRestaurantsSkeleton from "./_components/PopularRestaurantsSkeleton";
import SpecialFood from "./_components/SpecialFood";
import Testimonials from "./_components/Testimonials";

export default function HomePage() {
  return (
    <div className="">
      <Hero />
      <PopularItems />
      <Suspense fallback={<PopularRestaurantsSkeleton />}>
        <PopularRestaurants />
      </Suspense>{" "}
      <Features />
      <SpecialFood />
      <Testimonials />
    </div>
  );
}
