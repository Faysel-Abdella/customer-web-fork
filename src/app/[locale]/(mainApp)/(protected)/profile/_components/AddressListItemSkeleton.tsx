import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const AddressListItemSkeleton = () => {
  return (
    <Card className="gap-0 px-4 py-2 shadow-none">
      <CardHeader className="p-0">
        <div className="flex items-start justify-between">
          {/* Title Skeleton */}
          <Skeleton className="h-6 w-32" />
          {/* Delete Icon Skeleton */}
          <Skeleton className="size-8" />
        </div>
      </CardHeader>
      <CardContent className="flex items-end justify-between px-0 pt-4">
        <div className="w-full space-y-2">
          {/* Address lines skeleton */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div>
          {/* "Set Default" button skeleton */}
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  );
};