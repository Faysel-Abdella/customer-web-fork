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
      <CarouselContent className="-ml-0 h-80">
        {data?.list.map((item) => (
          <CarouselItem key={item.id} className="pl-0">
            <Card className="flex h-full justify-end bg-gradient-to-r from-orange-500 to-orange-600 max-md:rounded-none dark:from-orange-600 dark:to-orange-700">
              <CardContent className="flex h-full w-full pr-0 text-white max-md:flex-col-reverse max-md:px-2">
                <div className="flex h-full justify-between md:w-1/2 md:flex-col md:p-8">
                  <div className="flex flex-1 flex-col gap-2">
                    <div></div>
                    <h2 className="mb-2 text-xl font-bold md:text-5xl">
                      Lydia boone
                    </h2>
                    <div className="mb-4 flex w-fit items-center justify-center space-x-2 rounded-full bg-white/30 py-1 pr-3 text-xs md:p-2">
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
                  <div className="flex items-center space-x-4 text-sm max-md:items-end">
                    <Button
                      variant={"outline"}
                      className="hover:bg-primary rounded-full bg-white/20 p-4 hover:text-white"
                    >
                      Order now
                    </Button>
                  </div>
                </div>
                <div className="md:rounded-r-0 relative h-full overflow-hidden rounded-xl bg-white md:w-1/2">
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
      <CarouselPrevious className="text-background ml-14 bg-white/20 md:h-20 dark:bg-white/20" />
      <CarouselNext className="text-background mr-14 bg-white/20 md:h-20 dark:bg-white/20" />
    </Carousel>
  );
};

export default Banner;
