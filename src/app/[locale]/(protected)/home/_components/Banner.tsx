"use client";
import React from "react";
import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";
import { Clock, MapPin, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useBanner } from "@/hooks/useBanner";

const Banner = () => {
  const { data, error, isLoading } = useBanner();
  console.log(data);

  if (isLoading) {
    return (
      <div className="h-80 w-full p-4">
        {" "}
        <div className="h-full w-full animate-pulse rounded-xl bg-gray-300 dark:bg-gray-900" />
      </div>
    );
  }
  if (error) {
    return;
  }
  return (
    <Carousel
      className="w-full"
      plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
      opts={{ loop: true }}
    >
      <CarouselContent className="h-80">
        {data?.list.map((item) => (
          <CarouselItem key={item.id}>
            <Card className="flex h-full justify-end bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700">
              <CardContent className="flex h-full w-full pr-0 text-white">
                <div className="flex h-full w-1/2 flex-col justify-between p-8">
                  <div className="flex flex-1 flex-col gap-2">
                    <h2 className="mb-2 text-5xl font-bold">Lydia boone</h2>
                    <div className="mb-4 flex w-fit items-center justify-center space-x-2 rounded-full bg-white/30 p-2 py-1 pr-3 text-xs">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">Addiss Abeba</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>25-30 min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-500 text-white" />
                        <span>4.5</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <Button
                      variant={"outline"}
                      className="hover:bg-primary rounded-full bg-white/20 p-4 hover:text-white"
                    >
                      Order now
                    </Button>
                  </div>
                </div>
                <div className="relative h-full w-1/2 overflow-hidden rounded-l-xl bg-white from-transparent">
                  <Image
                    src={item.url}
                    alt="banner image"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-background ml-14 h-20 bg-white/20 dark:bg-white/20" />
      <CarouselNext className="text-background mr-14 h-20 bg-white/20 dark:bg-white/20" />
    </Carousel>
  );
};

export default Banner;
