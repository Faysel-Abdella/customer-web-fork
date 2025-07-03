// components/skeletons/OffersSkeleton.tsx
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

export function OffersSkeleton() {
  return (
    <Card className="py-0 shadow-none">
      <CardContent className="p-4">
        {/* Title Placeholder */}
        <div className="bg-border mb-3 h-6 w-48 animate-pulse rounded"></div>
        {/* Button Placeholder */}
        <div className="bg-border h-10 w-full animate-pulse rounded"></div>
      </CardContent>
    </Card>
  );
}
