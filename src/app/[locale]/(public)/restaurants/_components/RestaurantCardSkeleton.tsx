import { Card, CardContent } from "@/components/ui/card";

export function RestaurantCardSkeleton() {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-none">
      <div className="relative">
        <div className="bg-border h-48 w-full animate-pulse" />

        <div className="absolute top-3 right-3 h-10 w-10 animate-pulse rounded-md bg-white/90" />

        <div className="absolute top-3 left-3 h-6 w-12 animate-pulse rounded-full bg-gray-300" />
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <div className="bg-border mb-2 h-6 animate-pulse rounded" />
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-border h-4 w-4 animate-pulse rounded"
                  />
                ))}
              </div>
              <div className="bg-border h-4 w-8 animate-pulse rounded" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="bg-border h-4 w-4 animate-pulse rounded" />
              <div className="bg-border h-4 w-16 animate-pulse rounded" />
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-border h-4 w-4 animate-pulse rounded" />
              <div className="bg-border h-4 w-4 animate-pulse rounded" />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-2">
            <div className="bg-border h-4 w-20 animate-pulse rounded" />
            <div className="bg-border h-4 w-12 animate-pulse rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
