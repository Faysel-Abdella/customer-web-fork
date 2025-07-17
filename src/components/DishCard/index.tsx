import { Dot, Plus, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MenuItem } from "@/types/restaurant.types";

import DishCardImage from "./DishCardImage";

interface DishCardProps {
  dish: MenuItem;
}

const DishCard = ({ dish }: DishCardProps) => {
  const formatPrice = (price?: string) => {
    if (!price) return "$$";
    const value = parseFloat(price);
    return `$${value.toFixed(2)}`;
  };
  return (
    <div className="relative flex h-60 w-full items-end">
      <div className="bg-card flex h-48 w-full flex-col justify-between rounded-3xl border p-4 max-sm:p-5 sm:min-w-72">
        <div className="flex w-full justify-end">
          <p className="text-xl font-semibold">
            {dish.item_prices && formatPrice(dish.item_prices[0].price)}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex h-14 w-full items-center">
            <p className="line-clamp-2 text-lg font-semibold">{dish.title}</p>
          </div>

          <div className="flex w-full justify-between gap-1.5">
            <div className="text-muted-foreground flex items-center gap-1">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-primary text-primary" />
                <span>{dish.avg_rating}</span>
              </div>
              <div className="flex items-center">
                <Dot />
                <span>{dish.cook_time}</span>
              </div>
            </div>
            <Button size={"icon"} className="rounded-lg">
              <Plus size={24} />
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-5 h-28 w-36 overflow-hidden rounded-3xl shadow-lg sm:w-44">
        <div className="relative h-full w-full">
          <DishCardImage imgUrl={dish.image_file} title={dish.title} />
        </div>
      </div>
    </div>
  );
};

export default DishCard;
