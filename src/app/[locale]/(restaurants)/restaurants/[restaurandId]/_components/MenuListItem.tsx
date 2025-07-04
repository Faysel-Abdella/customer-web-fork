"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Clock, Heart, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { MenuItem } from "@/types/restaurant.types";

import MenuItemDetail from "./MenuItemDetail";

interface MenuListItemProps {
  menuItem: MenuItem;
}

const MenuListItem = ({ menuItem }: MenuListItemProps) => {
  const { user } = useAuth();
  const placeholderImage = "/assets/images/foodPlaceholder.jpg";
  const [imgSrc, setImgSrc] = useState(menuItem.image_file || placeholderImage);
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

  useEffect(() => {
    setImgSrc(menuItem.image_file || placeholderImage);
  }, [menuItem.image_file]);

  return (
    <Card className="gap-0 overflow-hidden border py-0 shadow-none transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex max-md:flex-col">
          <div className="relative h-48 w-full min-w-52 md:w-52">
            <Image
              src={imgSrc}
              alt={menuItem.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => {
                setImgSrc(placeholderImage);
              }}
            />
            {menuItem.is_available && (
              <Badge className="absolute top-2 left-2 bg-green-500/80 hover:bg-green-600/80">
                Available
              </Badge>
            )}
            {user && (
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/70 absolute top-2 right-2 shadow-sm"
              >
                <Heart
                  className={`h-5 w-5 ${
                    menuItem.is_favourite
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground hover:text-red-500"
                  }`}
                />
              </Button>
            )}
          </div>

          <div className="flex w-full flex-col justify-between p-3 md:px-4 md:py-2">
            <div className="mb-3 flex items-start justify-between">
              <div className="w-full max-w-full">
                <div className="flex items-center gap-2">
                  <h3 className="mb-2 text-xl font-semibold">
                    {menuItem.title}
                  </h3>
                  {menuItem.is_added_in_cart && (
                    <Badge className="bg-primary/50 h-5 rounded-full">
                      In Cart
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground line-clamp-1 text-sm leading-relaxed">
                  {menuItem.description}
                </p>
                <div className="w-full">
                  <Badge variant={"secondary"} className="border-border border">
                    {menuItem.cuisine_type_name}
                  </Badge>
                </div>
              </div>
              <div className="ml-4 w-fit min-w-fit text-right">
                <p className="text-2xl font-bold text-orange-600">
                  ${menuItem.itemPrice[0].price}
                </p>
              </div>
            </div>

            <div className="mb-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(menuItem.avg_rating)}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {menuItem.avg_rating}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Clock size={15} /> <span>{menuItem.cook_time} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <MenuItemDetail menuItemId={menuItem.id.toString()} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuListItem;
