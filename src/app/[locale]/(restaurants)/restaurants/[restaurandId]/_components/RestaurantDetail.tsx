import { Suspense } from "react";

import { getRestaurantDetails } from "@/actions/restaurants.actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import MenuList from "./MenuList";
import { MenuListSkeleton } from "./MenuListItemSkeleton";
import RestaurantBanner from "./RestaurantBanner";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantPhotos from "./RestaurantPhotos";

interface RestaurantDetailProps {
  restaurantId: string;
}
const RestaurantDetail = async ({ restaurantId }: RestaurantDetailProps) => {
  const { data: restaurant, error } = await getRestaurantDetails(restaurantId);

  if (error)
    return (
      <div className="flex h-dvh w-full items-center justify-center">
        <p>Something went wrong</p>
      </div>
    );
  if (restaurant)
    return (
      <div>
        <RestaurantBanner restaurant={restaurant} />
        <div className="parent-container">
          <Tabs defaultValue="menu" className="w-full p-5">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
            </TabsList>

            <TabsContent value="menu" className="min- space-y-6">
              <Suspense fallback={<MenuListSkeleton />}>
                <MenuList restaurantId={restaurantId} />
              </Suspense>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6"></TabsContent>

            <TabsContent value="photos" className="space-y-6">
              <RestaurantPhotos restaurant={restaurant} />
            </TabsContent>

            <TabsContent value="info" className="space-y-6">
              <RestaurantInfo restaurant={restaurant} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
};

export default RestaurantDetail;
