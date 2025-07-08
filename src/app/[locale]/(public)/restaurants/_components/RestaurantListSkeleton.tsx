import React from "react";

import { RestaurantCardSkeleton } from "./RestaurantCardSkeleton";

const RestaurantListSkeleton = () => {
  return Array.from({ length: 12 }, (_, i) => (
    <RestaurantCardSkeleton key={i} />
  ));
};

export default RestaurantListSkeleton;
