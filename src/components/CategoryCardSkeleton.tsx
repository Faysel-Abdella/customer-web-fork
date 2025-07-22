import { Skeleton } from "@/components/ui/skeleton";

const CategoryCardSkeleton = () => {
  return (
    <div className="bg-card flex flex-col space-y-3 overflow-hidden rounded-2xl border p-0">
      <Skeleton className="h-32 w-full rounded-b-none" />

      <div className="space-y-2 p-4 pt-0">
        <div className="flex items-start justify-between">
          <div className="w-full space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
