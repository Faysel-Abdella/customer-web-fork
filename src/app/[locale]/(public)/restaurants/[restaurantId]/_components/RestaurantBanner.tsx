import React from "react";
import Image from "next/image";

import { Restaurant } from "@/types/restaurant.types";

interface RestaurantBannerProps {
  restaurant: Restaurant;
}
const RestaurantBanner = ({ restaurant }: RestaurantBannerProps) => {
  return (
    <div className="mb-12 w-full">
      <div className="dark:bg-card relative h-72 w-full border shadow-xl sm:rounded-3xl sm:p-2">
        <div className="relative h-full w-full overflow-hidden sm:rounded-2xl">
          <Image
            src={restaurant.image_file}
            alt={restaurant.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute -bottom-12 max-sm:flex max-sm:w-full max-sm:justify-center sm:left-12">
          <div className="border-card relative size-24 overflow-hidden rounded-full border-4 shadow-xl">
            <Image
              src={restaurant.image_file}
              alt={restaurant.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBanner;
