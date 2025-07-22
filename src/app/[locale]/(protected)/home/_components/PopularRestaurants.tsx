import { getTopRestaurants } from "@/actions/restaurants.actions";
import RestaurantCard from "@/components/RestaurantCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "@/i18n/navigation";

const PopularRestaurants = async () => {
  const { data: restaurants } = await getTopRestaurants();

  if (restaurants)
    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="space-y-5 overflow-visible"
      >
        <div className="flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold md:mb-2 md:text-3xl">
            Popular Restaurants
          </h2>

          <div className="flex items-center gap-4">
            <Link
              href="/restaurants"
              className="group text-muted-foreground flex items-center font-semibold text-nowrap hover:text-orange-600"
            >
              See All
            </Link>
            <div className="flex gap-2">
              <CarouselPrevious className="bg-secondary text-foreground static -top-0 size-8 -translate-y-0 border-0 opacity-100" />
              <CarouselNext className="bg-secondary text-foreground static size-8 -translate-y-0 border-0 opacity-100" />
            </div>
          </div>
        </div>

        <CarouselContent className="-ml-4 overflow-visible">
          {restaurants?.map((restaurant) => (
            <CarouselItem
              key={restaurant.id}
              className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <RestaurantCard restaurant={restaurant} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
};

export default PopularRestaurants;
