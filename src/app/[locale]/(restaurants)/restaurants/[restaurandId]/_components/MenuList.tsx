import { useEffect } from "react";

import { toast } from "sonner";

import { useFetchRestaurantMenuList } from "@/hooks/restaurantsHooks/useFetchRestaurantMenuList";

import MenuListItem from "./MenuListItem";
import { MenuListItemSkeleton } from "./MenuListItemSkeleton";

interface MenuListProps {
  restaurantId: string;
}
const MenuList = ({ restaurantId }: MenuListProps) => {
  const {
    data: menuList,
    error,
    isLoading,
  } = useFetchRestaurantMenuList(restaurantId);

  useEffect(() => {
    if (error) {
      toast.error("Error", { description: error });
    }
  });
  const renderMenuList = () => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <MenuListItemSkeleton key={index} />
      ));
    } else if (menuList && menuList.length == 0) {
      return (
        <div className="flex h-52 w-full items-center justify-center">
          <p>No menu items</p>
        </div>
      );
    } else if (menuList) {
      return menuList.map((menuItem) => (
        <MenuListItem key={menuItem.id} menuItem={menuItem} />
      ));
    }
  };
  return (
    <div className="space-y-4">
      <div className="space-y-4">{renderMenuList()}</div>
    </div>
  );
};

export default MenuList;
