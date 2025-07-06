import { getRestaurantMenuList } from "@/actions/restaurants.actions";

import MenuListItem from "./MenuListItem";

interface MenuListProps {
  restaurantId: string;
}
const MenuList = async ({ restaurantId }: MenuListProps) => {
  const { data: menuList, error } = await getRestaurantMenuList(restaurantId);

  if (error) {
    return <div> Something went wrong </div>;
  }

  if (menuList && menuList.length == 0)
    return (
      <div className="flex h-52 w-full items-center justify-center">
        <p>No menu items</p>
      </div>
    );

  if (menuList && menuList.length > 0)
    return menuList.map((menuItem) => (
      <MenuListItem key={menuItem.id} menuItem={menuItem} />
    ));
};

export default MenuList;
