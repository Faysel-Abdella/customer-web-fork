import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TransactionCardSkeleton = () => {
  return (
    <Card className="border py-0 shadow-none">
      <CardContent className="p-3 md:p-6">
        {/* Top section: Icon, ID, status, amount, and date */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 overflow-hidden">
            {/* Icon */}
            <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
            {/* Details */}
            <div className="w-full space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
          {/* Amount and Date */}
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>

        {/* Bottom section: Order details and potential discounts */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-5 w-20" />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCardSkeleton;
