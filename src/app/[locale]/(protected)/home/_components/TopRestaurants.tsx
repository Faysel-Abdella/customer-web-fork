import { Suspense } from "react";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

import RestaurantsList from "./RestaurantsList";
import RestaurantsListSkeleton from "./RestaurantsListSkeleton";

export async function TopRestaurants() {
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 md:mb-2 md:text-3xl dark:text-white">
            Top Restaurants
          </h2>
          <p className="text-gray-600 max-md:text-sm dark:text-gray-400">
            Handpicked by our food experts
          </p>
        </div>
        <Link
          href="/restaurants"
          className="group flex items-center font-semibold text-orange-500 hover:text-orange-600"
        >
          View All
          <ChevronRight className="ml-1 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
      <Suspense fallback={<RestaurantsListSkeleton />}>
        <RestaurantsList />
      </Suspense>
    </section>
  );
}
