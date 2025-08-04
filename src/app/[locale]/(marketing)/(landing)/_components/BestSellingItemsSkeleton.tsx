import { LandingDishCardSkeleton } from "@/components/LandingDishCardSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const BestSellingItemsSkeleton = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full space-y-5 overflow-visible"
    >
      <div className="flex animate-pulse items-center justify-center gap-5 max-md:flex-col md:justify-between">
        <div className="bg-accent h-10 w-64 rounded-md" />
        <div className="flex gap-4">
          <div className="bg-accent size-14 rounded-md" />
          <div className="bg-accent size-14 rounded-md" />
        </div>
      </div>

      <CarouselContent className="overflow-visible">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
          >
            <LandingDishCardSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default BestSellingItemsSkeleton;
