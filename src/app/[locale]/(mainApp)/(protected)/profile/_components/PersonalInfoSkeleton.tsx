import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PersonalInfoSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Skeleton for the Header */}
      <div>
        <Skeleton className="h-9 w-48 md:h-10" />
        <Skeleton className="mt-3 h-5 w-72" />
      </div>

      <div className="space-y-6">
        {/* Skeleton for the Avatar Card */}
        <Card className="p-0 shadow-none">
          <CardContent className="flex items-center justify-between px-6 py-6">
            {/* Avatar Skeleton */}
            <Skeleton className="h-20 w-20 rounded-full" />
            {/* Edit Button Skeleton */}
            <Skeleton className="h-12 w-28" />
          </CardContent>
        </Card>

        {/* Skeleton for the Profile Information Card */}
        <Card className="p-6 py-6 shadow-none">
          <CardHeader className="px-0">
            {/* Card Title Skeleton */}
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="grid gap-7 px-0 py-0 md:grid-cols-2">
            {/* Skeleton for each info field (repeating the pattern) */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-5 w-48" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-36" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalInfoSkeleton;