import { getTranslations } from "next-intl/server";

import { getTopRestaurants } from "@/actions/restaurants.actions";
import RestaurantCard from "@/components/RestaurantCard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import PopularRestaurantCard from "./PopularRestaurantCard";

const PopularRestaurants = async () => {
  const t = await getTranslations("landing.popular_restaurants");
  const { data: popularRestaurants } = await getTopRestaurants();
  if (popularRestaurants)
    return (
      <section className="relative w-full bg-[url('/assets/images/landing/popular-resturent-bg.jpg')] bg-cover bg-center">
        <div className="parent-container flex w-full justify-center bg-black/60 py-20">
          <div className="container flex h-full w-full flex-col justify-center gap-16">
            <div className="flex w-full justify-center">
              <p className="text-center text-2xl font-bold text-white md:text-3xl lg:text-4xl xl:text-5xl">
                {t("title")}
              </p>
            </div>
            <div className="grid h-full w-full grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
              {popularRestaurants.map((restaurant) => (
                <RestaurantCard
                  restaurant={restaurant}
                  key={restaurant.id}
                  className="bg-neutral-800 text-white"
                />
              ))}
            </div>
            <div className="flex w-full justify-center">
              <Button className="w-fit">
                <Link href={"/restaurants"}>{t("view_all")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
};

export default PopularRestaurants;
