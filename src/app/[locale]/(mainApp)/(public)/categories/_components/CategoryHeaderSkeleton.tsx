import { Skeleton } from "@/components/ui/skeleton";

const CategoryHeaderSkeleton = () => {
  return (
    <div className="mb-8 flex items-center gap-x-3">
      <Skeleton className="h-9 w-48" />
      <Skeleton className="h-9 w-20" />
    </div>
  );
};

export default CategoryHeaderSkeleton;
