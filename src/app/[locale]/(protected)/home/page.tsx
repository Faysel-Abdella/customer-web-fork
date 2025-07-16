import { Metadata } from "next";

import Header from "@/components/Header";

import Banner from "./_components/Banner";
import { Categories } from "./_components/Categories";
import Offers from "./_components/Offers";
import TopRestaurants from "./_components/TopRestaurants";
import { TrendingDishes } from "./_components/TrendingDishes";

export const metadata: Metadata = {
  title: "Home | Time delivery",
  description:
    "Find and order food from restaurants near you. Browse menus, view ratings, and enjoy fast delivery with Time-Delivery.",
};

const HomePage = () => {
  return (
    <div className="h-full min-h-dvh">
      <Header />
      <div className="flex flex-col items-center pt-36 md:p-10 md:pt-28">
        <div className="container flex w-full flex-col justify-center gap-10">
          <div className="flex w-full flex-col gap-4">
            <Banner />
            <div className="flex flex-col gap-4 p-5">
              <Categories />
              <TopRestaurants />
              <TrendingDishes />
              <Offers />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
