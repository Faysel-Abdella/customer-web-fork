import { SearchX } from "lucide-react";

import { getCategoryItems } from "@/actions/actions";
import DishCard from "@/components/DishCard";

interface ItemsListProps {
  id: string;
}
const ItemsList = async ({ id }: ItemsListProps) => {
  const { data: items, error } = await getCategoryItems(id);
  if (error) {
    return (
      <div className="col-span-1 flex h-dvh w-full flex-col items-center justify-center gap-5 sm:col-span-2 lg:col-span-3 xl:col-span-4">
        <SearchX size={50} />
        <p className="text-xl">Something went wrong</p>
      </div>
    );
  }

  if (items && items.length == 0)
    return (
      <div className="col-span-1 flex h-dvh w-full flex-col items-center justify-center gap-5 sm:col-span-2 lg:col-span-3 xl:col-span-4">
        <SearchX size={50} />
        <p className="text-xl">No items in this category</p>
      </div>
    );

  if (items && items?.length > 0)
    return (
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <DishCard key={item.id} dish={item} />
        ))}
      </div>
    );
};

export default ItemsList;
