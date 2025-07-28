import { Suspense } from "react";

import MobileRestaurantFilter from "./_components/MobileRestaurantFilter";
import RestaurantFilter from "./_components/RestaurantFilter";
import { LocationHandler } from "./_components/LocationHandler";
import RestaurantListSkeleton from "./_components/RestaurantListSkeleton";
import RestaurantsList from "./_components/RestaurantsList";

export const dynamic = "force-dynamic";

interface RestaurantPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const RestaurantsPage = async ({ searchParams }: RestaurantPageProps) => {
  const param = await searchParams;
  const key = JSON.stringify(param);

  // console.log("restaurant page rerendered", key);
  const searchString: string | undefined =
    typeof param["search"] == "string" ? param["search"] : undefined;
  return (
    <div className="flex min-h-dvh flex-col gap-8 px-3 pt-36 pb-20 sm:px-4 md:px-10 lg:px-20 lg:pt-32 xl:px-32">
      <div className="flex gap-10 max-lg:flex-col">
        <div className="flex w-full max-lg:justify-between lg:w-1/4 lg:flex-col lg:gap-5">
          <h2 className="text-3xl font-semibold">Restaurants</h2>

          <RestaurantFilter className="bg-card h-fit space-y-6 rounded-xl border p-5 max-lg:hidden" />
          <MobileRestaurantFilter className="w-fit" />
        </div>
        <div className="w-full lg:w-3/4 lg:pt-14">
          {/* causing unnecessary rerenders*/}
          <LocationHandler />
          <Suspense fallback={<RestaurantListSkeleton />}>
            <RestaurantsList
              key={key}
              params={param}
              searchString={searchString}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;
