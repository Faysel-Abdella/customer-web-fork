"use client";

import { Dot, Star, Truck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Restaurant } from "@/types/restaurant.types";

import CustomImage from "../CustomImage";
import FavoriteButton from "../FavoriteButton";

interface RestaurantCardProps {
  restaurant: Restaurant;
  className?: string;
}

const restaurantImagePlaceHolder = "/assets/images/restaurant_placeholder.webp";
const RestaurantCard = ({ restaurant, className }: RestaurantCardProps) => {
  const { user } = useAuth();
  return (
    <Card
      className={cn(
        "group bg-background w-full overflow-hidden border-0 p-0 shadow-none transition-all hover:cursor-pointer",
        className,
      )}
    >
      <CardContent className="space-y-2 px-0">
        <div className="relative h-40 w-full overflow-hidden rounded-2xl">
          <Link href={`/restaurants/${restaurant.id}`}>
            <CustomImage
              imgUrl={restaurant.image_file}
              title={restaurant.title}
              placeholderImage={restaurantImagePlaceHolder}
            />
          </Link>
          {user && (
            <FavoriteButton
              is_favorite={restaurant.is_favourite === 1}
              itemId={restaurant.id.toString()}
              type="restaurant"
              className="bg-card/50 absolute top-4 left-4 z-10 rounded-full"
            />
          )}
          {restaurant.fee && (
            <div className="bg-card absolute -right-1 -bottom-1 z-10 flex w-fit items-center justify-center gap-2 rounded-tl-2xl px-2 py-1 pr-3">
              <Truck size={16} className="text-foreground" />
              <div className="bg-foreground h-4 w-px" />
              <span className="text-foreground font-semibold">
                ${restaurant.fee}
              </span>
            </div>
          )}
        </div>
        <Link href={`/restaurants/${restaurant.id}`}>
          <div className="space-y-1 p-2">
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
        </Link>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
