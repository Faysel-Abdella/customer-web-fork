import { Suspense } from "react";

import { LocationHandler } from "./_components/LocationHandler";
import RestaurantListSkeleton from "./_components/RestaurantListSkeleton";
import RestaurantPageHeader from "./_components/RestaurantPageHeader";
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

  console.log("restaurant page rerendered", key);
  return (
    <div className="min-h-dvh space-y-10 px-3 pt-36 pb-20 sm:px-4 md:px-10 lg:px-14">
      <RestaurantPageHeader />
      {/* causing unnecessary rerenders*/}
      <LocationHandler />
      <Suspense fallback={<RestaurantListSkeleton />}>
        <RestaurantsList params={param} />
      </Suspense>
    </div>
  );
};

export default RestaurantsPage;
