import { Suspense } from "react";

import CategoryList from "./_components/CategoryList";
import CategoryListSkeleton from "./_components/CategoryListSkeleton";

const CategoryPage = () => {
  return (
    <div className="min-h-dvh space-y-10 px-3 pt-36 pb-20 sm:px-4 md:px-10 lg:px-14">
      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  );
};

export default CategoryPage;
