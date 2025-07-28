import React from "react";

import FadingDivider from "@/components/FadingDivider";
import { Skeleton } from "@/components/ui/skeleton";

export default function RestaurantReviewsSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <h3 className="mb-8 text-xl font-semibold">Rating and Review</h3>
      <ReviewSummarySkeleton />
      <FadingDivider className="my-6 max-h-px w-full" />
      <div className="space-y-6">
        {/* Display 3 placeholder review cards */}
        {[...Array(3)].map((_, i) => (
          <React.Fragment key={i}>
            <ReviewCardSkeleton />
            {i < 2 && <FadingDivider />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const ReviewSummarySkeleton = () => {
  return (
    <div className="flex items-center gap-4 lg:gap-8">
      {/* Average Rating Placeholder */}
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="mb-1 h-12 w-20" />
        <Skeleton className="h-5 w-28" />
      </div>

      {/* Rating Bars Placeholder */}
      <div className="flex w-full items-center gap-4 md:w-1/2 lg:gap-8">
        <FadingDivider className="h-28 w-px bg-gradient-to-b max-md:hidden" />
        <div className="w-full space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 flex-shrink-0" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Verified Text Placeholder */}
      <div className="flex w-1/2 items-center gap-4 max-md:hidden lg:gap-8">
        <FadingDivider className="h-28 w-px min-w-px bg-gradient-to-b max-md:hidden" />
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  );
};

const ReviewCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9.5 w-9.5 flex-shrink-0 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-10/12" />
      </div>
    </div>
  );
};
