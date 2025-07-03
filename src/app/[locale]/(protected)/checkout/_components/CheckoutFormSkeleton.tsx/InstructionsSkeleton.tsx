// components/skeletons/InstructionsSkeleton.tsx

import { Card, CardContent } from "@/components/ui/card";

export function InstructionsSkeleton() {
  return (
    <Card className="py-0 shadow-none">
      <CardContent className="p-4">
        {/* Title Placeholder */}
        <div className="bg-border mb-3 h-6 w-64 animate-pulse rounded"></div>
        {/* Textarea Placeholder */}
        <div className="bg-border min-h-[80px] w-full animate-pulse rounded-md"></div>
      </CardContent>
    </Card>
  );
}
