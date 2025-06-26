import React from "react";

import RestaurantDetail from "./_components/RestaurantDetail";

interface RestaurantDetailPageProps {
  params: Promise<{ restaurandId: string }>;
}
const RestaurantDetailPage = async ({ params }: RestaurantDetailPageProps) => {
  const { restaurandId } = await params;

  return (
    <div className="min-h-dvh py-16">
      <RestaurantDetail restaurantId={restaurandId} />
    </div>
  );
};

export default RestaurantDetailPage;
