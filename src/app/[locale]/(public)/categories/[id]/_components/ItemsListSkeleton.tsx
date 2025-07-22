import MenuItemCardSkeleton from "@/components/MenuItemCard/MenuItemCardSkeleton";

import CategoryHeaderSkeleton from "../../_components/CategoryHeaderSkeleton";

const ItemsListSkeleton = async () => {
  return (
    <div>
      <CategoryHeaderSkeleton />
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <MenuItemCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ItemsListSkeleton;
