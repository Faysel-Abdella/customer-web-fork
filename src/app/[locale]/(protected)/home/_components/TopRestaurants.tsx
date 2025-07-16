import React from "react";

import { getTopRestaurants } from "@/actions/restaurants.actions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "@/i18n/navigation";

import RestaurantCard from "./RestaurantCard";

const TopRestaurants = async () => {
  const { data: restaurants } = await getTopRestaurants();

  if (restaurants)
    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="space-y-5 overflow-visible"
      >
        <div className="flex items-center justify-center gap-5 max-md:flex-col md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 md:mb-2 md:text-3xl dark:text-white">
              Top Restaurants
            </h2>
            <p className="text-gray-600 max-md:text-sm dark:text-gray-400">
              Handpicked by our food experts
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/restaurants"
              className="group text-muted-foreground flex items-center font-semibold hover:text-orange-600"
            >
              See All
            </Link>
            <div className="flex gap-2">
              <CarouselPrevious className="bg-secondary text-foreground static -top-0 size-8 -translate-y-0 border-0 opacity-100" />
              <CarouselNext className="bg-secondary text-foreground static size-8 -translate-y-0 border-0 opacity-100" />
            </div>
          </div>
        </div>

        <CarouselContent className="overflow-visible">
          {restaurants?.map((restaurant) => (
            <CarouselItem
              key={restaurant.id}
              className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <RestaurantCard restaurant={restaurant} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
};

export default TopRestaurants;
