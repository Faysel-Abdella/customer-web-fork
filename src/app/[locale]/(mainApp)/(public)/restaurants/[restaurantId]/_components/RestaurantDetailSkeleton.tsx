import FadingDivider from "@/components/FadingDivider";
import { Skeleton } from "@/components/ui/skeleton";

import { MenuListSkeleton } from "./MenuListSkeleton";

const RestaurantDetailSkeleton = () => {
  return (
    <div>
      {/* Banner Skeleton */}
      <div className="mb-12 w-full">
        <div className="dark:bg-card relative h-72 w-full border sm:rounded-3xl sm:p-2">
          <Skeleton className="h-full w-full sm:rounded-2xl" />
          <div className="absolute -bottom-12 max-sm:flex max-sm:w-full max-sm:justify-center sm:left-12">
            <Skeleton className="size-24 rounded-full" />
          </div>
        </div>
      </div>

      <div className="px-4 md:px-12">
        {/* Header Skeleton */}
        <>
          <div className="flex w-full items-center justify-between gap-5 py-6 pt-3 max-sm:flex-col">
            <div className="w-full max-sm:pb-4 sm:w-auto">
              <Skeleton className="h-9 w-48 max-sm:w-3/5" />
            </div>
            <div className="flex w-full items-center justify-end gap-7 sm:w-auto">
              <div className="flex flex-col items-end gap-1">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="bg-border h-8 w-px" />
              <div className="flex flex-col items-end gap-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </div>
          <div className="flex">
            <FadingDivider className="to-border" />
            <FadingDivider className="from-border" />
          </div>
        </>

        {/* Tabs and Content Skeleton */}
        <div className="flex w-full py-5 lg:flex-row lg:gap-10">
          {/* Desktop Tabs List Skeleton */}
          <div className="mb-6 hidden h-fit flex-col space-y-2 lg:flex lg:w-1/5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-2xl" />
            ))}
          </div>

          <div className="w-full space-y-5 lg:w-4/5">
            {/* Mobile Tabs List Skeleton */}
            <div className="grid w-full grid-cols-5 gap-2 lg:hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
            <MenuListSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailSkeleton;
