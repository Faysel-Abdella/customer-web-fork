"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Clock, DollarSign, Heart, MapPin, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Restaurant } from "@/types/restaurant.types";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const placeholderImage = "/assets/images/restaurant_placeholder.webp";
  const [imgSrc, setImgSrc] = useState(
    restaurant.image_file || placeholderImage,
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-primary text-primary"
            : i < rating
              ? "text-primary fill-primary"
              : "fill-border text-border"
        }`}
      />
    ));
  };

  const renderPriceSymbols = (priceRange: string) => {
    const symbols = priceRange.split("");
    return symbols.map((symbol, i) => (
      <DollarSign key={i} className="text-primary h-4 w-4" />
    ));
  };

  useEffect(() => {
    setImgSrc(restaurant.image_file || placeholderImage);
  }, [restaurant.image_file]);
  return (
    <Card className="group h-fit gap-0 overflow-hidden py-0 shadow-none transition-all duration-300">
      <div className="relative">
        <Link href={`/restaurants/${restaurant.id}`}>
          <Image
            src={imgSrc}
            alt={restaurant.title}
            width={400}
            height={200}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => {
              setImgSrc(placeholderImage);
            }}
          />
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="bg-background/70 absolute top-3 right-3 shadow-sm"
        >
          <Heart
            className={`h-5 w-5 ${
              restaurant.is_favourite
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground hover:text-red-500"
            }`}
          />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <Link href={`/restaurants/${restaurant.id}`}>
              <h3 className="group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors">
                {restaurant.title}
              </h3>
            </Link>

            <div className="mt-1 flex w-full justify-between">
              <div className="text-muted-foreground flex w-1/2 min-w-0 items-center gap-1 truncate text-sm">
                <MapPin className="h-4 w-4 min-w-4" /> {restaurant.location}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(restaurant.average_rating)}
                </div>
                <span className="text-muted-foreground text-sm font-medium">
                  {restaurant.average_rating}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{restaurant.estimated_delivery_time}</span>
            </div>
            <div className="flex items-center gap-1">
              {renderPriceSymbols(restaurant.price_per_person)}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-2">
            <span className="text-muted-foreground text-sm">Delivery fee</span>
            <span className="text-primary font-semibold">
              ${restaurant.estimated_delivery_fees}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
