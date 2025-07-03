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
                <div className="bg-border h-6 w-32 animate-pulse rounded md:w-48"></div>
                {/* Skeleton for Badge (conditionally rendered) */}
                <div className="bg-border h-5 w-16 animate-pulse rounded-full md:w-20"></div>
              </div>
              <div className="flex space-x-2">
                {" "}
                {/* Use flex and space-x for buttons */}
                {/* Skeleton for Edit Button */}
                <div className="bg-border h-8 w-8 animate-pulse rounded-md"></div>
                {/* Skeleton for Trash Button */}
                <div className="bg-border h-8 w-8 animate-pulse rounded-md"></div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-muted-foreground space-y-2">
              {" "}
              {/* Increased space-y for paragraphs */}
              {/* Skeleton for address */}
              <div className="bg-border h-4 w-32 animate-pulse rounded md:w-64"></div>
              {/* Skeleton for description */}
              <div className="bg-border h-4 w-28 animate-pulse rounded md:w-52"></div>
              {/* Skeleton for pincode */}
              <div className="bg-border h-4 w-20 animate-pulse rounded md:w-24"></div>
            </div>
            <div>
              {/* Skeleton for Set Default Button */}
              <div className="bg-border h-9 w-20 animate-pulse rounded-md md:w-28"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AddressListSkeleton;
