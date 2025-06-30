import React, { Suspense } from "react";

import RestaurantDetail from "./_components/RestaurantDetail";
import RestaurantDetailSkeleton from "./_components/RestaurantDetailSkeleton";

interface RestaurantDetailPageProps {
  params: Promise<{ restaurandId: string }>;
}
const RestaurantDetailPage = async ({ params }: RestaurantDetailPageProps) => {
  const { restaurandId } = await params;

  return (
    <div className="min-h-dvh py-16">
      <Suspense fallback={<RestaurantDetailSkeleton />}>
        <RestaurantDetail restaurantId={restaurandId} />
      </Suspense>
    </div>
  );
};

export default RestaurantDetailPage;
