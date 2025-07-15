import { Skeleton } from "@/components/ui/skeleton";

const ReviewSummarySkeleton = () => (
  <div className="flex items-start gap-8">
    <div className="flex flex-col items-center">
      <Skeleton className="mb-1 h-12 w-20" />
      <Skeleton className="h-4 w-16" />
    </div>

    <div className="flex-1">
      <Skeleton className="mb-4 h-5 w-28" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>

    <div className="text-right">
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
);

const ReviewCardSkeleton = () => (
  <div className="flex gap-4 border-b p-6">
    <Skeleton className="h-12 w-12 flex-shrink-0 rounded-full" />
    <div className="min-w-0 flex-1 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-5 w-24" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  </div>
);

const RestaurantReviewsSkeleton = () => {
  return (
    <div className="">
      <div className="p-6">
        <ReviewSummarySkeleton />
      </div>
      <div className="divide-border divide-y">
        {[...Array(3)].map((_, i) => (
          <ReviewCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantReviewsSkeleton;
