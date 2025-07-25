import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RestaurantCardSkeleton = () => {
  return (
    <Card className="w-full border-0 shadow-none">
      <CardContent className="space-y-2 px-0">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCardSkeleton;
