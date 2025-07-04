import React from "react";

import { getTopRestaurants } from "@/actions/restaurants.actions";

import RestaurantCard from "./RestaurantCard";

const RestaurantsList = async () => {
  const { data: restaurant } = await getTopRestaurants();

  return (
    <div className="space-y-6">
      {restaurant?.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantsList;
