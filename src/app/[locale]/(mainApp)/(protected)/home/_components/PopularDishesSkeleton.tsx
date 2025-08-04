import MenuItemCardSkeleton from "@/components/MenuItemCard/MenuItemCardSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export const PopularDishesSkeleton = () => {
  return (
    <div className="space-y-5">
      <div className="flex w-full items-center justify-between gap-5">
        <Skeleton className="h-8 w-1/2 md:w-80" />
        <div className="flex items-center gap-4">
          <Skeleton className="hidden h-6 w-16 sm:block" />
          <div className="flex gap-2">
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
          </div>
        </div>
      </div>

      <Carousel>
        <CarouselContent className="overflow-visible">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <MenuItemCardSkeleton />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
