import { Suspense } from "react";

import { getRestaurantDetails } from "@/actions/restaurants.actions";
import FadingDivider from "@/components/FadingDivider";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";

import CustomTabsTrigger from "./CustomTabsTrigger";
import MenuList from "./MenuList";
import { MenuListSkeleton } from "./MenuListItemSkeleton";
import RestaurantBanner from "./RestaurantBanner";
import RestaurantDetailError from "./RestaurantDetailError";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantOffers from "./RestaurantOffers";
import RestaurantPhotos from "./RestaurantPhotos";
import RestaurantReviews from "./RestaurantReviews";
import RestaurantReviewsSkeleton from "./RestaurantReviewsSkeleton";

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

  if (error) return <RestaurantDetailError />;
  if (restaurant)
    return (
      <div>
        <RestaurantBanner restaurant={restaurant} />
        <RestaurantHeader restaurant={restaurant} />
        <div>
          <Tabs
            defaultValue={tab || "menu"}
            className="bg-red flex w-full py-5 md:flex-row"
          >
            <TabsList className="md:bg-background text-muted-foreground mb-6 grid h-fit w-full grid-cols-5 md:flex md:w-1/5 md:flex-col">
              {tabs.map((tab) => (
                <CustomTabsTrigger
                  key={tab.value}
                  value={tab.value}
                  title={tab.title}
                  className="md:data-[state=active]:bg-secondary md:data-[state=inactive]:text-muted-foreground data-[state=active]:text-foreground w-full p-3 font-semibold md:flex md:justify-start md:rounded-2xl md:data-[state=active]:shadow-none"
                />
              ))}
              <FadingDivider className="max-md:hidden" />
            </TabsList>

            <TabsContent value="menu" className="space-y-6 md:w-4/5">
              <Suspense fallback={<MenuListSkeleton />}>
                <MenuList restaurantId={restaurantId} />
              </Suspense>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Suspense fallback={<RestaurantReviewsSkeleton />}>
                <RestaurantReviews restaurantId={restaurant.id.toString()} />
              </Suspense>
            </TabsContent>

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
