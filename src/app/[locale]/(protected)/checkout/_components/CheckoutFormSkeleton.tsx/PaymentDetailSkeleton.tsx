// components/skeletons/PaymentDetailSkeleton.tsx
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function PaymentDetailSkeleton() {
  return (
    <div className="sticky top-28 mt-4 space-y-10">
      <Card className="py-0 shadow-none">
        <CardContent className="p-4">
          {/* Bill Details Title */}
          <div className="mb-4 h-6 w-36 animate-pulse rounded bg-gray-200"></div>
          <div className="space-y-3">
            {/* Item total row */}
            <div className="flex justify-between">
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
            </div>
            {/* Delivery fees row */}
            <div className="flex justify-between">
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
            </div>
            <Separator className="bg-gray-200" /> {/* Separator remains */}
            {/* Total price row */}
            <div className="flex justify-between text-lg">
              <div className="h-6 w-36 animate-pulse rounded bg-gray-200"></div>
              <div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="py-0">
        <CardContent className="p-4">
          {/* Payment Details Title */}
          <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200"></div>

          <div className="space-y-3">
            {" "}
            {/* Use space-y for radio buttons */}
            {/* Payment Method 1 Placeholder */}
            <div className="flex animate-pulse items-center justify-between rounded-lg border border-transparent bg-gray-100 p-2">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded-full border border-gray-300 bg-gray-200"></div>{" "}
                {/* Radio button placeholder */}
                <div className="h-4 w-32 rounded bg-gray-200"></div>{" "}
                {/* Label placeholder */}
              </div>
              <div className="size-10 rounded-lg bg-gray-200"></div>{" "}
              {/* Image placeholder */}
            </div>
            {/* Payment Method 2 Placeholder */}
            <div className="flex animate-pulse items-center justify-between rounded-lg border border-transparent bg-gray-100 p-2">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded-full border border-gray-300 bg-gray-200"></div>{" "}
                {/* Radio button placeholder */}
                <div className="h-4 w-32 rounded bg-gray-200"></div>{" "}
                {/* Label placeholder */}
              </div>
              <div className="size-10 rounded-lg bg-gray-200"></div>{" "}
              {/* Image placeholder */}
            </div>
          </div>
          {/* Order Now Button Placeholder */}
          <div className="mt-6 h-12 w-full animate-pulse rounded-xl bg-gray-200"></div>
        </CardContent>
      </Card>
    </div>
  );
}
