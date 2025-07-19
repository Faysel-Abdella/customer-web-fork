"use client";
import React from "react";
import Image from "next/image";

import { useAuth } from "@/contexts/AuthContext";
import { MenuItem } from "@/types/restaurant.types";

import FavoriteButton from "../FavoriteButton";
import { Badge } from "../ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface MenuItemHeaderProps {
  menuItem: MenuItem;
}
const MenuItemHeader = ({ menuItem }: MenuItemHeaderProps) => {
  const { user } = useAuth();

  return (
    <div className="relative">
      <Badge className="absolute top-6 left-8 z-10 border-green-700 bg-green-500/50">
        Available
      </Badge>
      {user && (
        <FavoriteButton
          is_favorite={menuItem.is_favourite === 1}
          itemId={menuItem.id.toString()}
          type="menu_item"
          className="bg-card absolute top-6 right-8 z-10 rounded-full"
        />
      )}
      <Carousel opts={{ loop: true }} className="w-full pt-0">
        <CarouselContent className="-ml-0 h-64 w-full">
          {menuItem.menuImages.map((img) => (
            <CarouselItem key={img.id} className="w-full pl-0">
              <div className="relative h-64 w-full overflow-hidden rounded-lg max-sm:rounded-t-none">
                <Image
                  src={img.url}
                  fill
                  alt={`${img.name} image`}
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14" />
      </Carousel>
    </div>
  );
};

export default MenuItemHeader;
