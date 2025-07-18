"use client";
import React from "react";

import { cn } from "@/lib/utils";

import CategoryFilter from "./RestaurantFilter/CategoryFilter";
import OffersFilter from "./RestaurantFilter/OffersFilter";
import PriceFilter from "./RestaurantFilter/PriceFilter";
import RatingFilter from "./RestaurantFilter/RatingFilter";
import SortRestaurants from "./RestaurantFilter/SortRestaurants";

interface RestaurantsFilterProps {
  isMobile?: boolean;
  className?: string;
}
const RestaurantsFilters = ({
  isMobile,
  className,
}: RestaurantsFilterProps) => {
  const mobileClassName = cn("h-10", isMobile && "w-full rounded-xl");
  return (
    <div className={cn("flex gap-2", className)}>
      <SortRestaurants className={mobileClassName} />
      <CategoryFilter className={mobileClassName} />
      <OffersFilter className={mobileClassName} />
      <RatingFilter className={mobileClassName} />
      <PriceFilter className={mobileClassName} />
    </div>
  );
};

export default RestaurantsFilters;
