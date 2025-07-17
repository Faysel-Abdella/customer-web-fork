import React from "react";
import Image from "next/image";

import { Restaurant } from "@/types/restaurant.types";

interface RestaurantBannerProps {
  restaurant: Restaurant;
}
const RestaurantBanner = ({ restaurant }: RestaurantBannerProps) => {
  return (
    <div className="mb-12 w-full">
      <div className="dark:bg-card relative h-72 w-full rounded-3xl border p-2 shadow-xl">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Image
            src={restaurant.image_file}
            alt={restaurant.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-12 left-12">
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
