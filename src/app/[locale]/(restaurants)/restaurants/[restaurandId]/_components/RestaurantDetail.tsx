import { Suspense } from "react";

import { getRestaurantDetails } from "@/actions/restaurants.actions";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";

import CustomTabsTrigger from "./CustomTabsTrigger";
import MenuList from "./MenuList";
import { MenuListSkeleton } from "./MenuListItemSkeleton";
import RestaurantBanner from "./RestaurantBanner";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantOffers from "./RestaurantOffers";
import RestaurantPhotos from "./RestaurantPhotos";

interface RestaurantDetailProps {
  restaurantId: string;
  tab?: string;
}

const tabs = [
  {
    title: "Menu",
    value: "menu",
  },
  {
    title: "Reviews",
    value: "reviews",
  },
  {
    title: "Photos",
    value: "photos",
  },
  {
    title: "Info",
    value: "info",
  },
  {
    title: "Offers",
    value: "offers",
  },
];
const RestaurantDetail = async ({
  restaurantId,
  tab,
}: RestaurantDetailProps) => {
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
          <Tabs defaultValue={tab || "menu"} className="w-full p-5">
            <TabsList className="mb-6 grid w-full grid-cols-5">
              {tabs.map((tab) => (
                <CustomTabsTrigger
                  key={tab.value}
                  value={tab.value}
                  title={tab.title}
                />
              ))}
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
            <TabsContent value="offers" className="space-y-6">
              <RestaurantOffers restaurantId={restaurant.id.toString()} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
};

export default RestaurantDetail;
