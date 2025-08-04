import React from "react";

import RestaurantCardSkeleton from "@/components/RestaurantCard/RestaurantCardSkeleton";

const FavoritesListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 4 }).map((_, index) => {
        return <RestaurantCardSkeleton key={index} />;
      })}
    </div>
  );
};

export default FavoritesListSkeleton;
