// components/skeletons/InstructionsSkeleton.tsx

import { Card, CardContent } from "@/components/ui/card";

export function InstructionsSkeleton() {
  return (
    <Card className="py-0 shadow-none">
      <CardContent className="p-4">
        {/* Title Placeholder */}
        <div className="mb-3 h-6 w-64 animate-pulse rounded bg-gray-200"></div>
        {/* Textarea Placeholder */}
        <div className="min-h-[80px] w-full animate-pulse rounded-md bg-gray-200"></div>
      </CardContent>
    </Card>
  );
}
