"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import DOMPurify from "dompurify";
import { DollarSign, MapPin, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Restaurant } from "@/types/restaurant.types";

interface PopularRestaurantCardProps {
  restaurant: Restaurant;
}
const PopularRestaurantCard = ({ restaurant }: PopularRestaurantCardProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const formatPrice = (price: string) => {
    const numPrice = Number.parseFloat(price);
    return isNaN(numPrice) ? price : `${numPrice.toFixed(0)}`;
  };

  const descriptionHtml = restaurant.description;

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return;
  const sanitizedDescription = DOMPurify.sanitize(descriptionHtml, {
    USE_PROFILES: { html: true },
  });
  return (
    <Card className="group dark:bg-card dark:border-border w-96 overflow-hidden border-neutral-900 bg-neutral-800 p-0 transition-all duration-300">
      <CardContent className="space-y-5 p-0">
        <div className="relative">
          <div className="relative aspect-[4/2] overflow-hidden">
            <Image
              src={
                restaurant.image_file || "/placeholder.svg?height=240&width=320"
              }
              alt={restaurant.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {restaurant.average_rating > 0 && (
              <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/30 px-2 py-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">
                  {restaurant.average_rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="group-hover:text-primary mb-2 line-clamp-1 text-xl font-bold text-white transition-colors">
              {restaurant.title}
            </h3>

            <div className="text-muted-foreground mb-2 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1 text-sm">
                {restaurant.location}
              </span>
            </div>
            <p
              className="text-muted-foreground line-clamp-2 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />

            <div className="flex items-center gap-1 text-orange-600">
              <DollarSign className="h-4 w-4" />
              <span className="font-semibold">
                {formatPrice(restaurant.price_per_person)} per person
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularRestaurantCard;
