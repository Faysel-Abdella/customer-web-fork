import { Dot, Plus, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MenuItem } from "@/types/restaurant.types";

import DishCardImage from "./DishCardImage";

interface DishCardProps {
  dish: MenuItem;
}

const DishCard = ({ dish }: DishCardProps) => {
  const getPrice = () => {
    let price = "0";
    if (dish.itemPrice) {
      price = dish.itemPrice[0].price;
    }
    if (dish.item_prices) {
      price = dish.item_prices[0].price;
    }
    const value = parseFloat(price);
    return `$${value.toFixed(2)}`;
  };

  const getCookTime = () => {
    const cookTime = dish.cook_time;
    const startOfM = cookTime.indexOf("M");
    if (!startOfM) return cookTime;

    return cookTime.slice(0, startOfM).trim();
  };

  return (
    <div className="relative flex h-56 w-full items-end">
      <div className="bg-card flex h-48 w-full flex-col justify-between rounded-3xl border p-4 max-sm:p-5 sm:min-w-72">
        <div className="flex w-full justify-end">
          <p className="text-xl font-semibold">{getPrice()}</p>
        </div>
        <div className="space-y-4">
          <p className="line-clamp-1 text-lg font-semibold">{dish.title}</p>

          <div className="flex w-full justify-between gap-1.5">
            <div className="text-muted-foreground flex items-center gap-1">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-primary text-primary" />
                <span>{dish.avg_rating}</span>
              </div>
              {dish.cook_time.trim() && (
                <div className="flex items-center">
                  <Dot />
                  <span>{getCookTime()} min</span>
                </div>
              )}
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
