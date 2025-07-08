"use client";
import Image from "next/image";

import DOMPurify from "dompurify";
import { Clock, Star } from "lucide-react";

import FavoriteButton from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAuth } from "@/contexts/AuthContext";
import { MenuItem } from "@/types/restaurant.types";

import AddOnList from "./AddOnList";

interface MenuItemDisplayProps {
  menuItem: MenuItem;
  selectedAddonIds: number[];
  setSelectedAddonIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const MenuItemDisplay = ({
  menuItem,
  selectedAddonIds,
  setSelectedAddonIds,
}: MenuItemDisplayProps) => {
  const { user } = useAuth();
  const sanitizedDescription = DOMPurify.sanitize(menuItem.description || "", {
    USE_PROFILES: { html: true },
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-orange-400 text-orange-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  return (
    <div className="relative p-4">
      <Badge className="absolute top-6 left-8 z-10 border-green-700 bg-green-500/50">
        Available
      </Badge>
      <Carousel opts={{ loop: true }}>
        <CarouselContent className="-ml-2 h-80 w-full">
          {menuItem.menuImages.map((img) => (
            <CarouselItem key={img.id} className="w-full">
              <div className="relative h-80 w-full overflow-hidden rounded-lg">
                <Image src={img.url} fill alt={`${img.name} image`} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14" />
      </Carousel>

      <div className="mt-4 space-y-4">
        <div className="border-b pb-2">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">{menuItem.title}</p>
            {user && (
              <FavoriteButton
                is_favorite={menuItem.is_favourite === 1}
                itemId={menuItem.id.toString()}
                type="menu_item"
              />
            )}
          </div>
          <Badge variant="secondary" className="border-border mb-2">
            {menuItem.cuisine_type_name}
          </Badge>
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              <div className="flex items-center gap-2">
                {renderStars(menuItem.avg_rating)} {menuItem.avg_rating}
              </div>
              <div className="text-muted-foreground flex items-center gap-1">
                <Clock size={16} /> {menuItem.cook_time} minutes
              </div>
            </div>
            <p className="text-primary text-lg font-semibold">
              {menuItem.itemPrice[0].price}$
            </p>
          </div>
        </div>

        <div className="space-y-2 pb-4">
          <p className="font-bold">Description</p>
          <p
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
        </div>

        <AddOnList
          addOns={menuItem.addOnsList}
          selectedAddonIds={selectedAddonIds}
          setSelectedAddonIds={setSelectedAddonIds}
        />
      </div>
    </div>
  );
};

export default MenuItemDisplay;
