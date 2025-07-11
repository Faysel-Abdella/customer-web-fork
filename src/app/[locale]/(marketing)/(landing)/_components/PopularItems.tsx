import Image from "next/image";

import { getTranslations } from "next-intl/server";

import { getPopularDishes } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import PopularItemCard from "./PopularItemCard";

const popularOrder = [
  {
    id: "1",
    title: "COMBO MEAL",
    imgUrl: "/assets/images/landing/order-img-1.png",
  },
  {
    id: "2",
    title: "CHICKEN SANDWICH",
    imgUrl: "/assets/images/landing/order-img-2.png",
  },
  {
    id: "3",
    title: "CHICKEN WRAP",
    imgUrl: "/assets/images/landing/order-img-3.png",
  },
];

const PopularItems = async () => {
  const t = await getTranslations("landing.popular_food_items");

  const { data: dishes } = await getPopularDishes();
  return (
    <div className="parent-container flex w-full flex-col items-center gap-20 py-20">
      <div className="container flex flex-col gap-20">
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
          {dishes && (
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
          )}
        </Carousel>
        <div className="flex justify-evenly gap-10 max-lg:flex-col">
          {popularOrder.map((order) => (
            <div
              key={order.id}
              className="relative h-96 w-full overflow-hidden rounded-tr-4xl rounded-bl-4xl md:h-56"
            >
              <Image
                fill
                src={"/assets/images/landing/order-bg.png"}
                alt={"special order background"}
              />

              <div className="absolute top-0 flex h-full w-full max-md:flex-col max-md:items-center">
                <div className="flex w-1/2 flex-col gap-1 pt-5 max-md:items-center md:pt-12 md:pl-8">
                  <p className="text-primary font-semibold">{t("this_week")}</p>
                  <p className="text-center font-bold text-white md:text-start">
                    {order.title}
                  </p>
                  <p className="text-primary font-semibold">
                    {t("limited_offer")}
                  </p>
                  <Button className="mt-3 w-fit text-base">
                    {t("order_button")}
                  </Button>
                </div>
                <div className="relative flex h-full w-1/2 flex-col gap-1 py-5 pt-12 md:py-10 md:pl-8">
                  <Image
                    width={150}
                    height={150}
                    src={order.imgUrl}
                    alt={`${order.title} image`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularItems;
