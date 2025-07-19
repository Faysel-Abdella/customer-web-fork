import { Skeleton } from "@/components/ui/skeleton";

const MenuItemDetailSkeleton = () => {
  return (
    <div className="flex h-dvh flex-col">
      {/* Header Image Skeleton */}
      <Skeleton className="h-64 w-full shrink-0 rounded-lg max-sm:rounded-none" />

      <div className="flex-1 space-y-5 overflow-y-auto px-4 pt-6">
        {/* Top Info Section Skeleton */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>

        {/* Description Section Skeleton */}
        <div className="space-y-2 pb-4">
          <Skeleton className="h-6 w-1/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        {/* Quantity Control Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-10 w-28" />
        </div>

        <Skeleton className="h-px w-full" />

        {/* Add-ons Section Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-2">
                <div className="flex items-center gap-4">
                  <Skeleton className="size-14 shrink-0 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
                <Skeleton className="size-5 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Form Skeleton */}
      <div className="mt-auto shrink-0">
        <Skeleton className="h-px w-full" />
        <div className="space-y-4 p-4">
          <div className="flex w-full flex-col gap-2">
            <div className="flex justify-between text-sm">
              <div className="space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-1 text-right">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
            <Skeleton className="my-1 h-px w-full" />
            <div className="mb-6 flex w-full justify-between">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/5" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetailSkeleton;
