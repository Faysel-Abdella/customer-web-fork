import { Clock, Star } from "lucide-react";

import FavoriteButton from "@/components/FavoriteButton";
import { Card, CardContent } from "@/components/ui/card";
import { MenuItem } from "@/types/restaurant.types";

import MenuItemDetail from "../../restaurants/[restaurantId]/_components/MenuItemDetail";

import ItemCardImage from "./ItemCardImage";

interface ItemCardProps {
  menuItem: MenuItem;
}
const ItemCard = ({ menuItem }: ItemCardProps) => {
  return (
    <Card className="group cursor-pointer overflow-hidden border p-0 shadow-none backdrop-blur-sm transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <ItemCardImage
              imgTitle={menuItem.title}
              imgUrl={menuItem.image_file}
            />
          </div>

          <div className="absolute top-3 right-3">
            <FavoriteButton
              is_favorite={menuItem.is_favourite == 1}
              itemId={menuItem.id.toString()}
              type="menu_item"
            />
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
            {menuItem.title}
          </h3>
          <div className="mb-3 flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {menuItem.avg_rating}
              </span>
            </div>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <span>{menuItem.cook_time}</span>
              <Clock size={16} />
              <span>minutes</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-orange-500">
                $ {menuItem.itemPrice[0].price}
              </span>
            </div>
            <MenuItemDetail
              menuItemId={menuItem.id.toString()}
              className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
