import { Dot, Star } from "lucide-react";

import { getMenuItemPrice } from "@/lib/utils";
import { MenuItem } from "@/types/restaurant.types";

import CustomImage from "../CustomImage";
import MenuItemDetail from "../MenuItemDetail";

interface MenuItemCardProps {
  menuItem: MenuItem;
}
const foodPlaceholder = "/assets/images/foodPlaceholder.jpg";

const MenuItemCard = ({ menuItem }: MenuItemCardProps) => {
  const getCookTime = () => {
    const cookTime = menuItem.cook_time;
    const startOfM = cookTime.indexOf("M");
    if (!startOfM) return cookTime;

    return cookTime.slice(0, startOfM).trim();
  };

  return (
    <div className="relative flex h-56 w-full items-end">
      <div className="bg-card flex h-48 w-full flex-col justify-between rounded-3xl border p-4 max-sm:p-5 sm:min-w-72">
        <div className="flex w-full justify-end">
          <p className="text-lg font-semibold">{getMenuItemPrice(menuItem)}</p>
        </div>
        <div className="space-y-4">
          <p className="line-clamp-1 text-lg font-semibold">{menuItem.title}</p>

          <div className="flex w-full justify-between gap-1.5">
            <div className="text-muted-foreground flex items-center gap-1">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-primary text-primary" />
                <span>{menuItem.avg_rating}</span>
              </div>
              {menuItem.cook_time.trim() && (
                <div className="flex items-center">
                  <Dot />
                  <span>{getCookTime()} min</span>
                </div>
              )}
            </div>
            <MenuItemDetail menuItemId={menuItem.id.toString()} />
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-5 h-28 w-36 overflow-hidden rounded-3xl shadow-lg sm:w-44">
        <div className="relative h-full w-full">
          <CustomImage
            placeholderImage={foodPlaceholder}
            imgUrl={menuItem.image_file}
            title={menuItem.title}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
