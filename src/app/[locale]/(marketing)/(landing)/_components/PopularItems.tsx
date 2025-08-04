import { Suspense } from "react";

import BestSellingItemsCarousel from "./BestSellingItemsCarousel";
import BestSellingItemsSkeleton from "./BestSellingItemsSkeleton";
import { Categories } from "./Categories";
import { CategoriesSkeleton } from "./CategoriesSkeleton";
import PopularItemsCarousel from "./PopularItemsCarousel";
import PopularItemsCarouselSkeleton from "./PopularItemsCarouselSkeleton";

const PopularItems = async () => {
  return (
    <div className="parent-container flex w-full flex-col items-center gap-20 py-20">
      <div className="container flex flex-col gap-20">
        <Suspense fallback={<PopularItemsCarouselSkeleton />}>
          <PopularItemsCarousel />
        </Suspense>
        <Suspense fallback={<BestSellingItemsSkeleton />}>
          <BestSellingItemsCarousel />
        </Suspense>
        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories />
        </Suspense>
      </div>
    </div>
  );
};

export default PopularItems;
