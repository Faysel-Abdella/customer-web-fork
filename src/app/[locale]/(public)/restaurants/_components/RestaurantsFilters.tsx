"use client";

import { cn } from "@/lib/utils";

interface RestaurantsFilterProps {
  isMobile?: boolean;
  className?: string;
}
const RestaurantsFilters = ({ className }: RestaurantsFilterProps) => {
  return <div className={cn("flex gap-2", className)}></div>;
};

export default RestaurantsFilters;
