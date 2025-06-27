"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { SearchX } from "lucide-react";
import { toast } from "sonner";

import { useFetchRestaurants } from "@/hooks/restaurantsHooks/useFetchRestaurants";
import { Restaurant } from "@/types/restaurant.types";

import MobileRestaurantFilter from "./MobileRestaurantFilter";
import { RestaurantCard } from "./RestaurantCard";
import { RestaurantCardSkeleton } from "./RestaurantCardSkeleton";
import RestaurantFilters from "./RestaurantFilters";

const RestaurantsList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const { data: restaurants, error, isLoading } = useFetchRestaurants();

  useEffect(() => {
    if (error) {
      toast.error("Something went Wrong");
    }
  }, [error]);

  const renderRestaurants = (restaurants: Restaurant[] | null) => {
    if (restaurants && restaurants.length == 0) {
      return (
        <div className="col-span-1 flex h-dvh w-full flex-col items-center justify-center gap-5 sm:col-span-2 lg:col-span-3 xl:col-span-4">
          <SearchX size={50} />
          <p className="text-xl">No Results</p>
        </div>
      );
    } else if (restaurants) {
      return restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ));
    }
  };

  return (
    <div className="parent-container mx-auto flex w-full gap-5 px-4 py-8 max-lg:flex-col max-lg:pt-4">
      <div className="flex w-full justify-end lg:w-1/4">
        <RestaurantFilters className="bg-card flex h-fit w-full flex-col gap-5 rounded-lg border p-5 max-lg:hidden" />
        <MobileRestaurantFilter />
      </div>
      <div className="flex w-full flex-col gap-4 lg:w-3/4">
        {search && (
          <p className="text-lg">Search results for &quot;{search}&quot;</p>
        )}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 12 }, (_, i) => (
                <RestaurantCardSkeleton key={i} />
              ))
            : renderRestaurants(restaurants)}
        </div>
      </div>
    </div>
  );
};

export default RestaurantsList;
