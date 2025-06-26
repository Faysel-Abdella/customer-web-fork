import React from "react";
import Image from "next/image";

import { Clock, MapPin, Star } from "lucide-react";

import { Restaurant } from "@/types/restaurant.types";

interface RestaurantBanner {
  restaurant: Restaurant;
}
const RestaurantBanner = ({ restaurant }: RestaurantBanner) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-orange-400 text-orange-400"
            : i < rating
              ? "fill-orange-200 text-orange-400"
              : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };
  return (
    <div className="relative h-64 md:h-80">
      <Image
        src={restaurant.image_file}
        alt={restaurant.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute right-4 bottom-4 left-4">
        <div className="bg-background/95 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <div>
                <h1 className="text-lg font-semibold">{restaurant.title}</h1>
              </div>
              <div className="mb-1 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(restaurant.average_rating)}
                </div>
                <span className="font-semibold">
                  {restaurant.average_rating}
                </span>
              </div>
              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{restaurant.estimated_delivery_time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{restaurant.location}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm">Delivery fee</p>
              <p className="font-semibold text-orange-600">
                ${restaurant.estimated_delivery_fees}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBanner;
