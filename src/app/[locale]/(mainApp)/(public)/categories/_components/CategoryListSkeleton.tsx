import CategoryCardSkeleton from "@/components/CategoryCardSkeleton";

import CategoryHeaderSkeleton from "./CategoryHeaderSkeleton";

const CategoryListSkeleton = async () => {
  return (
    <div>
      <CategoryHeaderSkeleton />
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default CategoryListSkeleton;
