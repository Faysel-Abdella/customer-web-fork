import { Suspense } from "react";

import RestaurantFilter from "./_components/RestaurantFilter";
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
  const searchString: string | undefined =
    typeof param["search"] == "string" ? param["search"] : undefined;
  return (
    <div className="flex min-h-dvh flex-col gap-8 px-3 pt-32 pb-20 sm:px-4 md:px-10 lg:px-32">
      <h2 className="text-3xl font-semibold">Restaurants</h2>

      <div className="flex gap-10">
        <RestaurantFilter className="bg-card h-fit w-1/4 space-y-4 rounded-xl border p-4" />
        <div className="w-3/4">
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
