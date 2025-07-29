import React from "react";

import { getTranslations } from "next-intl/server";

import { getPopularDishes } from "@/actions/actions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import PopularItemCard from "./PopularItemCard";

const PopularItemsCarousel = async () => {
  const t = await getTranslations("landing.popular_food_items");

  const { data: dishes } = await getPopularDishes();

  if (dishes && dishes.length > 0)
    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="space-y-5 overflow-visible"
      >
        <div className="flex items-center justify-center gap-5 max-md:flex-col md:justify-between">
          <h2 className="text-foreground text-4xl font-bold">{t("title")}</h2>
          <div className="flex gap-4">
            <CarouselPrevious className="bg-primary dark:bg-primary static -top-0 size-14 -translate-y-0 border-0 text-white opacity-100" />
            <CarouselNext className="bg-primary dark:bg-primary static size-14 -translate-y-0 border-0 text-white opacity-100" />
          </div>
        </div>

        <CarouselContent className="overflow-visible">
          {dishes.map((item) => (
            <CarouselItem
              key={item.title}
              className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <PopularItemCard menuItem={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
};

export default PopularItemsCarousel;
