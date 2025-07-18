"use client";

import { Dot, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Restaurant } from "@/types/restaurant.types";

import CustomImage from "../CustomImage";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const restaurantImagePlaceHolder = "/assets/images/restaurant_placeholder.webp";
const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Card className="group bg-background w-full overflow-hidden border-0 p-2 shadow-none transition-all hover:cursor-pointer">
      <CardContent className="space-y-2 px-0">
        <div className="relative h-40 w-full overflow-hidden rounded-2xl">
          <CustomImage
            imgUrl={restaurant.image_file}
            title={restaurant.title}
            placeholderImage={restaurantImagePlaceHolder}
          />
        </div>
        <div className="space-y-1">
          <p className="group-hover:text-primary truncate text-lg">
            {restaurant.title}
          </p>
          <div className="text-muted-foreground flex items-center gap-1">
            <Star size={16} className="fill-primary text-primary" />
            <p>{restaurant.average_rating}</p>
            <Dot />
            <p>{restaurant.estimated_delivery_time}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
