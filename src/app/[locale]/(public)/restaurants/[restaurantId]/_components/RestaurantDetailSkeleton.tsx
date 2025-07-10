import { Clock, MapPin, Star } from "lucide-react";

import { MenuListSkeleton } from "./MenuListItemSkeleton";

const RestaurantDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* --- Banner Skeleton --- */}
      <div className="bg-muted-foreground relative h-64 md:h-80">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute right-4 bottom-4 left-4">
          <div className="rounded-lg bg-gray-200/95 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              {/* Left Side: Info */}
              <div className="space-y-2">
                <div className="h-7 w-48 rounded bg-gray-400" />
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-400" />
                    ))}
                  </div>
                  <div className="h-5 w-8 rounded bg-gray-400" />
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div className="h-4 w-20 rounded bg-gray-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div className="h-4 w-24 rounded bg-gray-400" />
                  </div>
                </div>
              </div>
              {/* Right Side: Price */}
              <div className="text-right">
                <div className="mb-1 h-4 w-20 rounded bg-gray-400" />
                <div className="h-6 w-16 rounded bg-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Tabs and Content Skeleton --- */}
      <div className="parent-container">
        <div className="w-full p-5">
          {/* Tab Triggers Skeleton */}
          <div className="bg-muted mb-6 grid w-full grid-cols-5 gap-2 rounded-lg p-1 md:gap-4">
            <div className="bg-background h-7 rounded-md shadow-md" />
            <div className="bg-background h-7 rounded-md shadow-md" />
            <div className="bg-background h-7 rounded-md shadow-md" />
            <div className="bg-background h-7 rounded-md shadow-md" />
            <div className="bg-background h-7 rounded-md shadow-md" />
          </div>

          {/* MenuList Content Skeleton */}
          <div className="space-y-6">
            {/* Repeating skeleton for a menu item */}

            <MenuListSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailSkeleton;
