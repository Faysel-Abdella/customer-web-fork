import { Suspense } from "react";

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
  return (
    <div className="min-h-dvh space-y-10 px-3 pt-36 pb-20 sm:px-4 md:px-10 lg:px-14">
      <RestaurantPageHeader />
      <Suspense fallback={<RestaurantListSkeleton />}>
        <RestaurantsList key={key} params={param} />
      </Suspense>
    </div>
  );
};

export default RestaurantsPage;
