"use client";

import { Bike, Star, User } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Restaurant } from "@/types/restaurant.types";

import CustomImage from "../CustomImage";
import CustomLink from "../CustomLink";
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
          <CustomLink href={`/restaurants/${restaurant.id}`}>
            <CustomImage
              imgUrl={restaurant.image_file}
              title={restaurant.title}
              placeholderImage={restaurantImagePlaceHolder}
            />
          </CustomLink>
          {user && (
            <FavoriteButton
              is_favorite={restaurant.is_favourite === 1}
              itemId={restaurant.id.toString()}
              type="restaurant"
              className="bg-card absolute top-4 left-4 z-10 rounded-full"
            />
          )}
          {restaurant.price_per_person && (
            <div className="bg-card absolute -right-1 -bottom-1 z-10 flex w-fit items-center justify-center gap-1 rounded-tl-2xl px-4 py-1 pr-4 pb-2">
              <span className="text-foreground font-semibold">
                ${parseFloat(restaurant.price_per_person).toFixed(2) || "N/A"}
              </span>
              <div className="flex items-end text-xs">
                /<User size={14} />
              </div>
            </div>
          )}
        </div>
        <CustomLink href={`/restaurants/${restaurant.id}`}>
          <div className="space-y-1 p-2">
            <p className="group-hover:text-primary truncate text-lg">
              {restaurant.title}
            </p>
            <div className="text-muted-foreground flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-primary text-primary" />
                <p>{restaurant.average_rating}</p>
                <p>({restaurant.rating_info.totalReviews})</p>
              </div>
              {restaurant.delivery_info && (
                <div className="flex items-center gap-2">
                  <Bike size={20} />
                  <p>{restaurant.delivery_info.delivery_time_minutes} Min</p>
                </div>
              )}
            </div>
          </div>
        </CustomLink>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
