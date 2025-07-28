import { MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { useLoggedLocationContext } from "./LocationContainer";

interface LoggedInLocationProps {
  className?: string;
  skeletonClassName?: string;
}
const LoggedInLocation = ({
  className,
  skeletonClassName,
}: LoggedInLocationProps) => {
  const {
    isLoading,
    isError,
    defaultAddress,
    addressList,
    handleSetDefaultAddress,
    isOpen,
    isUpdating,
    setOpen,
  } = useLoggedLocationContext();

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {isUpdating || isLoading ? (
        <Skeleton className={cn("h-10 w-32", skeletonClassName)} />
      ) : (
        <DialogTrigger asChild>
          {defaultAddress ? (
            <button
              className={cn(
                "bg-secondary flex h-10 w-32 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-2 text-sm font-semibold",
                className,
              )}
            >
              <MapPin className="h-4 w-4 min-w-4" />
              <div className="flex flex-col items-start">
                <span className="truncate text-sm font-medium text-nowrap">
                  {defaultAddress.title}
                </span>
                <p className="text-muted-foreground truncate text-xs text-nowrap">
                  {defaultAddress.address}
                </p>
              </div>
            </button>
          ) : (
            <button
              className={cn(
                "bg-secondary flex h-10 w-32 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-2 text-sm font-semibold",
                className,
              )}
            >
              <MapPin className="h-4 w-4 min-w-4" />
              <div className="flex flex-col items-start">
                <span className="truncate text-sm font-medium text-nowrap">
                  Select Address
                </span>
              </div>
            </button>
          )}
        </DialogTrigger>
      )}

      <DialogContent className="max-sm:min-w-screen">
        <DialogHeader>
          <DialogTitle>Select Default Addresss</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {isError ? (
          <p>Couldnt fetch addresses</p>
        ) : (
          <div className="flex w-full flex-col overflow-hidden">
            {addressList &&
              addressList?.length > 0 &&
              addressList.map((address) => (
                <Button
                  key={address.id}
                  variant="ghost"
                  className="h-auto cursor-pointer justify-between rounded-xl p-2"
                  onClick={() => handleSetDefaultAddress(address)}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-orange-500 p-2">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{address.title}</span>

                        {address.is_default == 1 && (
                          <Badge className="h-4 text-xs" variant={"secondary"}>
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground truncate text-start text-wrap">
                        {address.address}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}

            <Button className="mt-2 w-full">Edit addresses</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoggedInLocation;
