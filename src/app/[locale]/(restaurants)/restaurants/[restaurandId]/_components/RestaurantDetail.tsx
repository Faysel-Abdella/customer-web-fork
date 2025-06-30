"use client";

import { Loader } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetchRestaurantDetail } from "@/hooks/restaurantsHooks/useFetchRestaurantDetail";

import MenuList from "./MenuList";
import RestaurantBanner from "./RestaurantBanner";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantPhotos from "./RestaurantPhotos";

interface RestaurantDetailProps {
  restaurantId: string;
}
const RestaurantDetail = ({ restaurantId }: RestaurantDetailProps) => {
  const {
    data: restaurant,
    error,
    isLoading,
  } = useFetchRestaurantDetail(restaurantId);

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center pt-20">
        <Loader size={30} className="animate-spin" />
      </div>
    );

  if (error) return <div>Something went wrong</div>;
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
              <MenuList restaurantId={restaurantId} />
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
