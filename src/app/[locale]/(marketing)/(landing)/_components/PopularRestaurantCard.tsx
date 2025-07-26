"use client";
import { useEffect, useState } from "react";

import DOMPurify from "dompurify";
import { MapPin } from "lucide-react";

import CustomImage from "@/components/CustomImage";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Restaurant } from "@/types/restaurant.types";

interface PopularRestaurantCardProps {
  restaurant: Restaurant;
}
const restaurantPlaceHolder = "/assets/images/restaurant_placeholder.webp";
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
    <Link href={`/restaurants/${restaurant.id}`}>
      <Card className="w-full max-w-sm gap-4 overflow-hidden border-gray-800 bg-gray-900 py-0 shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <div className="relative h-48 w-full">
          <CustomImage
            imgUrl={restaurant.image_file}
            title={restaurant.title}
            placeholderImage={restaurantPlaceHolder}
          />
        </div>
        <CardContent className="p-4 pt-0">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 line-clamp-2 text-xl font-bold text-white">
                {restaurant.title}
              </h3>
              <div className="mb-3 flex items-center text-gray-300">
                <MapPin className="mr-1 h-4 w-4" />
                <span className="text-sm">{restaurant.location}</span>
              </div>
            </div>

            <p
              className="line-clamp-2 h-11 text-sm leading-relaxed text-gray-200"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
            <div className="border-t border-gray-700 pt-2">
              {restaurant.price_per_person &&
                restaurant.price_per_person != "0" && (
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600">
                      ${formatPrice(restaurant.price_per_person)}
                    </span>
                    <span className="text-sm text-gray-400">per person</span>
                  </div>
                )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PopularRestaurantCard;
