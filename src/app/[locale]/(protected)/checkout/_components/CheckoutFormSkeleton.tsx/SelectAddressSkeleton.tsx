// components/skeletons/SelectAddressSkeleton.tsx
import React from "react";

import { MapPin } from "lucide-react"; // Assuming lucide-react

import { Card, CardContent } from "@/components/ui/card";

export function SelectAddressSkeleton() {
  return (
    <Card className="py-0 shadow-none">
      <CardContent className="p-4">
        {/* Title Placeholder */}
        <div className="mb-3 h-6 w-36 animate-pulse rounded bg-gray-200"></div>
        {/* Button/Address Placeholder */}
        <div className="flex h-auto w-full animate-pulse items-center justify-between rounded-xl border border-transparent bg-gray-100 p-2">
          <div className="flex items-center gap-3">
            <div className="animate-pulse rounded-full bg-gray-300 p-2">
              <MapPin className="h-4 w-4 text-gray-400" />{" "}
              {/* Greyed out icon */}
            </div>
            <div className="flex flex-col items-start space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-48 animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
          {/* Edit icon placeholder */}
          <div className="h-5 w-5 animate-pulse rounded bg-gray-200"></div>
        </div>
      </CardContent>
    </Card>
  );
}
