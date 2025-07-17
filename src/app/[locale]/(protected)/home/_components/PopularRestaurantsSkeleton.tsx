import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

import RestaurantCardSkeleton from "./RestaurantCardSkeleton";

const PopularRestaurantsSkeleton = () => {
  return (
    <div className="space-y-5">
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-8 w-64" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-16" />
          <div className="flex gap-2">
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
          </div>
        </div>
      </div>
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <RestaurantCardSkeleton />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PopularRestaurantsSkeleton;
