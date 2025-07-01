import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AddressListSkeleton = () => {
  return (
    <div className="grid gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="shadow-none">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                {/* Skeleton for CardTitle */}
                <div className="h-6 w-48 animate-pulse rounded bg-gray-200"></div>
                {/* Skeleton for Badge (conditionally rendered) */}
                <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200"></div>
              </div>
              <div className="flex space-x-2">
                {" "}
                {/* Use flex and space-x for buttons */}
                {/* Skeleton for Edit Button */}
                <div className="h-8 w-8 animate-pulse rounded-md bg-gray-200"></div>
                {/* Skeleton for Trash Button */}
                <div className="h-8 w-8 animate-pulse rounded-md bg-gray-200"></div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-muted-foreground space-y-2">
              {" "}
              {/* Increased space-y for paragraphs */}
              {/* Skeleton for address */}
              <div className="h-4 w-64 animate-pulse rounded bg-gray-200"></div>
              {/* Skeleton for description */}
              <div className="h-4 w-52 animate-pulse rounded bg-gray-200"></div>
              {/* Skeleton for pincode */}
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
            </div>
            <div>
              {/* Skeleton for Set Default Button */}
              <div className="h-9 w-28 animate-pulse rounded-md bg-gray-200"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AddressListSkeleton;
