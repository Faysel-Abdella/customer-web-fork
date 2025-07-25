import { useCallback, useEffect, useState, useTransition } from "react";

import { MapPin } from "lucide-react";
import { toast } from "sonner";

import { getAddressList, setDefaultAddress } from "@/actions/profile.actions";
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
import { useLocation } from "@/contexts/LocationContext";
import { Address } from "@/types/profile.types";

const LoggedInLocation = () => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressList, setAddressList] = useState<Address[] | null>(null);
  const [isUpdating, startUpdate] = useTransition();
  const [isOpen, setOpen] = useState(false);
  const { setLocation } = useLocation();

  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  const selectDefaultAddress = useCallback(() => {
    if (!addressList) {
      return;
    }
    const defaultAddress = addressList.find((item) => item.is_default == 1);

    if (!defaultAddress) {
      return;
    } else {
      setSelectedAddress(defaultAddress);
      setLocation({
        latitude: parseFloat(defaultAddress.latitude),
        longitude: parseFloat(defaultAddress.longitude),
      });
    }
  }, [addressList, setSelectedAddress, setLocation]);

  const handleSetDefaultAddress = (address: Address) => {
    startUpdate(async () => {
      const results = await setDefaultAddress(address.id.toString());
      if (results.success) {
        fetchAddressList();
        setOpen(false);
      }
      if (results.error) {
        toast.error("Failed at setting default address");
      }
    });
  };

  const fetchAddressList = useCallback(async () => {
    startTransition(async () => {
      // console.log("Fetching locations");
      const result = await getAddressList();
      if (result.data) {
        setAddressList(result.data);
      } else if (result.error) {
        setError(result.error);
      }
    });
  }, []);

  useEffect(() => {
    if (!addressList && !isPending) {
      fetchAddressList();
    }
  }, [isPending, addressList, fetchAddressList]);

  useEffect(() => {
    if (addressList != null) {
      selectDefaultAddress();
    }
  }, [addressList, selectDefaultAddress]);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {isUpdating ? (
        <Skeleton className="h-10 w-32" />
      ) : (
        <DialogTrigger asChild>
          {selectedAddress ? (
            <button className="bg-secondary flex h-10 w-32 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-2 text-sm font-semibold">
              <MapPin className="h-4 w-4 min-w-4" />
              <div className="flex flex-col items-start">
                <span className="truncate text-sm font-medium text-nowrap">
                  {selectedAddress.title}
                </span>
                <p className="text-muted-foreground truncate text-xs text-nowrap">
                  {selectedAddress.address}
                </p>
              </div>
            </button>
          ) : (
            <button className="bg-secondary flex h-10 w-32 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-2 text-sm font-semibold">
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Default Addresss</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {error ? (
          <p>Couldnt fetch addresses</p>
        ) : (
          <div>
            {addressList &&
              addressList?.length > 0 &&
              addressList.map((address) => (
                <Button
                  key={address.id}
                  variant="ghost"
                  className="h-auto w-full cursor-pointer justify-between rounded-xl p-2"
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
                      <p className="text-muted-foreground">{address.address}</p>
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
