"use client";
import Image from "next/image";

import DOMPurify from "dompurify";
import { Clock, Heart, MapPin, Star, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Restaurant } from "@/types/restaurant.types";

interface RestaurantCardProps {
  restaurant: Restaurant;
}
const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const descriptionHtml = restaurant.description;

  const sanitizedDescription = DOMPurify.sanitize(descriptionHtml, {
    USE_PROFILES: { html: true },
  });
  return (
    <Card className="group overflow-hidden border p-0 shadow-none backdrop-blur-sm transition-all duration-300">
      <CardContent className="p-2 py-3">
        <div className="flex max-md:flex-col">
          <div className="relative aspect-video h-56 w-full overflow-hidden rounded-lg md:aspect-square md:w-2/5">
            <Image
              src={restaurant.image_file}
              alt={restaurant.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Removed restaurant.discount as it's not in the new interface */}
            <div className="absolute top-2 right-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/90 shadow-lg hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-700"
              >
                <Heart className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col justify-between pl-2 md:col-span-2">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold">{restaurant.title}</h3>
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  <MapPin size={14} />
                  {restaurant.location}
                </div>
                <p
                  className="text-muted-foreground line-clamp-2 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />

                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 rounded-full bg-yellow-50 px-3 py-1 dark:bg-yellow-900/20">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {restaurant.average_rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-muted-foreground dark:text-gray-400">
                      {restaurant.estimated_delivery_time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-primary dark:bg-primary/20 dark:text-primary flex items-center space-x-2 rounded-full bg-orange-50 px-3 py-1 text-sm">
                  <Truck className="h-4 w-4" />
                  <span>${restaurant.price_per_person}</span>
                </div>
              </div>
              <Button
                className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 transition-transform duration-200 group-hover:scale-105 hover:from-orange-600 hover:to-red-600"
                asChild
              >
                <Link href={`/restaurants/${restaurant.id}`}>Order Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
