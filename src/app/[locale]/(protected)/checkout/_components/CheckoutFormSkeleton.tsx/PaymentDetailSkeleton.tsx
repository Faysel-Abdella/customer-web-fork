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
          <div className="bg-border mb-4 h-6 w-36 animate-pulse rounded"></div>
          <div className="space-y-3">
            {/* Item total row */}
            <div className="flex justify-between">
              <div className="bg-border h-4 w-28 animate-pulse rounded"></div>
              <div className="bg-border h-4 w-16 animate-pulse rounded"></div>
            </div>
            {/* Delivery fees row */}
            <div className="flex justify-between">
              <div className="bg-border h-4 w-28 animate-pulse rounded"></div>
              <div className="bg-border h-4 w-16 animate-pulse rounded"></div>
            </div>
            <Separator className="bg-border" /> {/* Separator remains */}
            {/* Total price row */}
            <div className="flex justify-between text-lg">
              <div className="bg-border h-6 w-36 animate-pulse rounded"></div>
              <div className="bg-border h-6 w-20 animate-pulse rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="py-0">
        <CardContent className="p-4">
          {/* Payment Details Title */}
          <div className="bg-border mb-4 h-6 w-40 animate-pulse rounded"></div>

          <div className="space-y-3">
            {" "}
            {/* Use space-y for radio buttons */}
            {/* Payment Method 1 Placeholder */}
            <div className="bg-border flex animate-pulse items-center justify-between rounded-lg border border-transparent p-2">
              <div className="flex items-center gap-2">
                <div className="bg-border border-border size-4 rounded-full border"></div>{" "}
                {/* Radio button placeholder */}
                <div className="bg-border h-4 w-32 rounded"></div>{" "}
                {/* Label placeholder */}
              </div>
              <div className="bg-border size-10 rounded-lg"></div>{" "}
              {/* Image placeholder */}
            </div>
            {/* Payment Method 2 Placeholder */}
            <div className="bg-border flex animate-pulse items-center justify-between rounded-lg border border-transparent p-2">
              <div className="flex items-center gap-2">
                <div className="bg-border border-border size-4 rounded-full border"></div>{" "}
                {/* Radio button placeholder */}
                <div className="bg-border h-4 w-32 rounded"></div>{" "}
                {/* Label placeholder */}
              </div>
              <div className="bg-border size-10 rounded-lg"></div>{" "}
              {/* Image placeholder */}
            </div>
          </div>
          {/* Order Now Button Placeholder */}
          <div className="bg-border mt-6 h-12 w-full animate-pulse rounded-xl"></div>
        </CardContent>
      </Card>
    </div>
  );
}
