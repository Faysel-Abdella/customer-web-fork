import { SearchX } from "lucide-react";

import { getRestaurants } from "@/actions/restaurants.actions";
import { buildUrlSearchParams } from "@/lib/utils";

import { RestaurantCard } from "./RestaurantCard";
import RestaurantPagination from "./RestaurantPagination";

interface RestaurantListProps {
  params: {
    [key: string]: string | string[] | undefined;
  };
}
const RestaurantsList = async ({ params }: RestaurantListProps) => {
  const queryParams = buildUrlSearchParams(params).toString();

  const {
    data: restaurants,
    pageData,
    error,
  } = await getRestaurants(queryParams);

  if (error) {
    return (
      <div className="col-span-1 flex h-dvh w-full flex-col items-center justify-center gap-5 sm:col-span-2 lg:col-span-3 xl:col-span-4">
        <SearchX size={50} />
        <p className="text-xl">Something went wrong</p>
      </div>
    );
  }

  if (restaurants && restaurants.length == 0)
    return (
      <div className="col-span-1 flex h-dvh w-full flex-col items-center justify-center gap-5 sm:col-span-2 lg:col-span-3 xl:col-span-4">
        <SearchX size={50} />
        <p className="text-xl">No Results</p>
      </div>
    );

  if (restaurants && restaurants?.length > 0)
    return (
      <div className="w-full space-y-4">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
        {pageData && <RestaurantPagination pageData={pageData} />}
      </div>
    );
};

export default RestaurantsList;
