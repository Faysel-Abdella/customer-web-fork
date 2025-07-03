// components/skeletons/SelectAddressSkeleton.tsx
import React from "react";

import { MapPin } from "lucide-react"; // Assuming lucide-react

import { Card, CardContent } from "@/components/ui/card";

export function SelectAddressSkeleton() {
  return (
    <Card className="py-0 shadow-none">
      <CardContent className="p-4">
        {/* Title Placeholder */}
        <div className="bg-border mb-3 h-6 w-36 animate-pulse rounded"></div>
        {/* Button/Address Placeholder */}
        <div className="bg-border flex h-auto w-full animate-pulse items-center justify-between rounded-xl border border-transparent p-2">
          <div className="flex items-center gap-3">
            <div className="bg-border animate-pulse rounded-full p-2">
              <MapPin className="text-muted-foreground h-4 w-4" />{" "}
              {/* Greyed out icon */}
            </div>
            <div className="flex flex-col items-start space-y-2">
              <div className="bg-border h-4 w-32 animate-pulse rounded"></div>
              <div className="bg-border h-4 w-48 animate-pulse rounded"></div>
            </div>
          </div>
          {/* Edit icon placeholder */}
          <div className="bg-border h-5 w-5 animate-pulse rounded"></div>
        </div>
      </CardContent>
    </Card>
  );
}
