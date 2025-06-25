"use client";
import React, { useEffect } from "react";

import { toast } from "sonner";

import { useFetchRestaurants } from "@/hooks/restaurantsHooks/useFetchRestaurants";

import { RestaurantCard } from "./RestaurantCard";
import { RestaurantCardSkeleton } from "./RestaurantCardSkeleton";

const RestaurantsList = () => {
  const { data: restaurants, error, isLoading } = useFetchRestaurants();

  useEffect(() => {
    if (error) {
      toast.error("Something went Wrong");
    }
  }, [error]);

  console.log(isLoading);
  if (isLoading)
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }, (_, i) => (
            <RestaurantCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );

  if (!restaurants) return <div>No restaurants</div>;

  if (restaurants)
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    );
};

export default RestaurantsList;
