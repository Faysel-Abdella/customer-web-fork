import { Suspense } from "react";
import { Metadata } from "next";

import Header from "@/components/Header";

import Banner from "./_components/Banner";
import { Categories } from "./_components/Categories";
import { CategoriesSkeleton } from "./_components/CategoriesSkeleton";
import Offers from "./_components/Offers";
import { OffersSkeleton } from "./_components/OffersSkeleton";
import PopularRestaurants from "./_components/PopularRestaurants";
import PopularRestaurantsSkeleton from "./_components/PopularRestaurantsSkeleton";
import { TrendingDishes } from "./_components/TrendingDishes";
import { TrendingDishesSkeleton } from "./_components/TrendingDishesSkeleton";

export const metadata: Metadata = {
  title: "Home | Time delivery",
  description:
    "Find and order food from restaurants near you. Browse menus, view ratings, and enjoy fast delivery with Time-Delivery.",
};

const HomePage = () => {
  return (
    <div className="h-full min-h-dvh">
      <Header />
      <div className="flex flex-col items-center px-3 pt-36 pb-20 sm:px-4 md:px-10 md:pt-28 lg:px-14">
        <div className="container flex w-full flex-col justify-center gap-10">
          <div className="flex w-full flex-col gap-4">
            <Banner />
            <div className="flex flex-col gap-10 p-5 md:gap-14">
              <Suspense fallback={<CategoriesSkeleton />}>
                <Categories />
              </Suspense>
              <Suspense fallback={<PopularRestaurantsSkeleton />}>
                <PopularRestaurants />
              </Suspense>
              <Suspense fallback={<TrendingDishesSkeleton />}>
                <TrendingDishes />
              </Suspense>
              <Suspense fallback={<OffersSkeleton />}>
                <Offers />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
