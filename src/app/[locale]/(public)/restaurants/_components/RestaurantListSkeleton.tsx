import React from "react";

import { RestaurantCardSkeleton } from "./RestaurantCardSkeleton";

const RestaurantListSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 12 }, (_, i) => (
        <RestaurantCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default RestaurantListSkeleton;
