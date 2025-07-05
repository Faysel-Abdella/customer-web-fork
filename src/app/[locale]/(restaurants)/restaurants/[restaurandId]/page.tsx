import React, { Suspense } from "react";

import RestaurantDetail from "./_components/RestaurantDetail";
import RestaurantDetailSkeleton from "./_components/RestaurantDetailSkeleton";

interface RestaurantDetailPageProps {
  params: Promise<{ restaurandId: string }>;
  searchParams?: Promise<{ tab?: string }>;
}
const RestaurantDetailPage = async ({
  params,
  searchParams,
}: RestaurantDetailPageProps) => {
  const { restaurandId } = await params;
  const searchParamsObj = await searchParams;

  return (
    <div className="min-h-dvh py-16">
      <Suspense fallback={<RestaurantDetailSkeleton />}>
        <RestaurantDetail
          tab={searchParamsObj?.tab}
          restaurantId={restaurandId}
        />
      </Suspense>
    </div>
  );
};

export default RestaurantDetailPage;
