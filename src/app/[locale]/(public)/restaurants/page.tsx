import { Suspense } from "react";

import TitleBanner from "../../(marketing)/_components/TitleBanner";

import MobileRestaurantFilter from "./_components/MobileRestaurantFilter";
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
  return (
    <div className="min-h-dvh">
      <TitleBanner title="Restaurants" className="pt-20" />

      <div className="lg:px-16 xl:px-32">
        <div className="container mx-auto flex w-full gap-5 px-4 py-8 max-lg:flex-col max-lg:pt-4">
          <div className="flex w-full justify-end lg:w-1/4">
            <RestaurantFilter className="bg-card flex h-fit w-full flex-col gap-5 rounded-lg border p-5 max-lg:hidden" />
            <MobileRestaurantFilter />
          </div>
          <div className="flex w-full flex-col gap-4 lg:w-3/4">
            <Suspense fallback={<RestaurantListSkeleton />}>
              <RestaurantsList key={key} params={param} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;
