import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const PopularItemsCarouselSkeleton = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full space-y-5 overflow-visible"
    >
      <div className="flex animate-pulse items-center justify-center gap-5 max-md:flex-col md:justify-between">
        <div className="bg-muted-foreground h-10 w-64 rounded-md" />
        <div className="flex gap-4">
          <div className="bg-muted-foreground size-14 rounded-md" />
          <div className="bg-muted-foreground size-14 rounded-md" />
        </div>
      </div>

      <CarouselContent className="overflow-visible">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="animate-pulse space-y-3 rounded-lg p-2">
              <div className="bg-muted-foreground aspect-square w-full rounded-lg" />
              <div className="space-y-2">
                <div className="bg-muted-foreground h-5 w-3/4 rounded-md" />
                <div className="bg-muted-foreground h-5 w-1/2 rounded-md" />
              </div>
              <div className="bg-muted-foreground h-10 w-full rounded-md" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PopularItemsCarouselSkeleton;
