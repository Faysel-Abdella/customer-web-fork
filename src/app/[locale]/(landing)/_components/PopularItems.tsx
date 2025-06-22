import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const popularItems = [
  {
    title: "Shrimp Noodle Soup",
    imgUrl: "/assets/images/landing/popular-item1.png",
    prices: 35.0,
  },
  {
    title: "Beef Noodle Soup",
    imgUrl: "/assets/images/landing/popular-item2.png",
    prices: 38.0,
  },
  {
    title: "Shrimp & Veggie Stir-fry",
    imgUrl: "/assets/images/landing/popular-item3.png",
    prices: 32.0,
  },
  {
    title: "Spicy Fried Noodles",
    imgUrl: "/assets/images/landing/popular-item4.png",
    prices: 28.0,
  },
  {
    title: "Steamed Rice",
    imgUrl: "/assets/images/landing/popular-item5.png",
    prices: 8.0,
  },
];

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

const PopularItems = () => {
  return (
    <div className="flex min-h-dvh w-full flex-col gap-20 px-32 py-20">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="overflow-visible"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-foreground text-4xl font-bold">
            Popular Food Items
          </h2>
          <div className="flex gap-4">
            <CarouselPrevious className="bg-primary static -top-0 size-14 -translate-y-0 border-0 text-white opacity-100" />
            <CarouselNext className="bg-primary static size-14 -translate-y-0 border-0 text-white opacity-100" />
          </div>
        </div>
        <CarouselContent className="overflow-visible">
          {popularItems.map((item) => (
            <CarouselItem key={item.title} className="basis-1/5">
              <div className="pt-28">
                <div className="bg-primary/20 dark:border-border dark:bg-secondary border-primary relative flex h-44 w-56 flex-col items-center rounded-tr-4xl rounded-bl-4xl border">
                  <Image
                    width={122}
                    height={95}
                    src={item.imgUrl}
                    alt="image of popular item"
                    className="absolute -top-10"
                  />
                  <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-5 pt-12">
                    <span className="text-center text-xl font-bold">
                      {item.title}
                    </span>
                    <span className="text-muted-foreground">Start from</span>
                    <span className="text-primary text-lg font-semibold">
                      ${item.prices}
                    </span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
          {popularItems.map((item) => (
            <CarouselItem key={item.title} className="basis-1/5">
              <div className="pt-28">
                <div className="bg-primary/20 border-primary relative flex h-44 w-56 flex-col items-center rounded-tr-4xl rounded-bl-4xl">
                  <Image
                    width={122}
                    height={95}
                    src={item.imgUrl}
                    alt="image of popular item"
                    className="absolute -top-10"
                  />
                  <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-5 pt-12">
                    <span className="text-center text-xl font-bold">
                      {item.title}
                    </span>
                    <span className="text-muted-foreground">Start from</span>
                    <span className="text-primary text-lg font-semibold">
                      ${item.prices}
                    </span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-evenly gap-10 max-md:flex-col">
        {popularOrder.map((order) => (
          <div
            key={order.id}
            className="relative h-56 w-full overflow-hidden rounded-tr-4xl rounded-bl-4xl"
          >
            <Image
              fill
              src={"/assets/images/landing/order-bg.png"}
              alt={"special order background"}
            />

            <div className="absolute top-0 flex h-full w-full">
              <div className="flex w-1/2 flex-col gap-1 pt-12 pl-8">
                <p className="text-primary font-semibold">ON THIS WEEK</p>
                <p className="font-bold text-white">{order.title}</p>
                <p className="text-primary font-semibold">Limited Time Offer</p>
                <Button className="mt-3 text-base">Order Now</Button>
              </div>
              <div className="relative flex h-full w-1/2 flex-col gap-1 py-10 pt-12 pl-8">
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
  );
};

export default PopularItems;
