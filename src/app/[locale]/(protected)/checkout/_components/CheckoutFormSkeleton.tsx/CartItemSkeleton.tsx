// components/skeletons/CartItemSkeleton.tsx

import { Card, CardContent } from "@/components/ui/card"; // Assuming these are valid paths

export function CartItemSkeleton() {
  return (
    <Card className="py-0 shadow-none">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Image Placeholder */}
          <div className="bg-border relative h-20 w-20 flex-shrink-0 animate-pulse overflow-hidden rounded-lg"></div>

          <div className="flex-1">
            <div className="mb-2 flex items-start justify-between">
              <div>
                {/* Title Placeholder */}
                <div className="bg-border mb-2 h-6 w-24 animate-pulse rounded"></div>
                {/* Price Placeholder */}
                <div className="bg-border h-6 w-24 animate-pulse rounded"></div>
              </div>

              {/* Trash Button Placeholder */}
              <div className="bg-border h-8 w-8 animate-pulse rounded-md"></div>
            </div>
            <div className="flex items-center justify-between">
              {/* Quantity controls Placeholder */}
              <div className="flex items-center gap-3">
                <div className="bg-border h-8 w-8 animate-pulse rounded-md"></div>
                <div className="bg-border h-8 w-14 animate-pulse rounded-md"></div>
                <div className="bg-border h-8 w-8 animate-pulse rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Add-ons Placeholder */}
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="bg-border h-4 w-28 animate-pulse rounded"></div>
            <div className="bg-border h-4 w-20 animate-pulse rounded"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
