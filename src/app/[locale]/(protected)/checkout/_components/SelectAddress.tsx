import React, { useCallback, useEffect, useState, useTransition } from "react";

import { Edit, MapPin, Plus } from "lucide-react";

import { getAddressList } from "@/actions/profile.actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Address } from "@/types/profile.types";

interface SelectAddressProps {
  selectedAddress: Address | null;
  setSelectedAddress: React.Dispatch<React.SetStateAction<Address | null>>;
}

const SelectAddress = ({
  selectedAddress,
  setSelectedAddress,
}: SelectAddressProps) => {
  const [addressList, setAddressList] = useState<Address[] | null>();
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
    }
  }, [addressList, setSelectedAddress]);

  useEffect(() => {
    if (!addressList && !isPending) {
      startTransition(async () => {
        const result = await getAddressList();
        if (result.data) {
          setAddressList(result.data);
        } else if (result.error) {
          setError(result.error);
        }
      });
    }
  }, [isPending, addressList]);

  useEffect(() => {
    if (addressList && selectedAddress === null) {
      selectDefaultAddress();
    }
  }, [addressList, selectedAddress, selectDefaultAddress]);

  return (
    <Card className="py-0 shadow-none">
      <CardContent className="p-4">
        <h3 className="mb-3 text-lg font-semibold">Add Address</h3>
        <Dialog>
          <DialogTrigger asChild>
            {selectedAddress ? (
              <Button
                variant="ghost"
                className="bg-secondary h-auto w-full justify-between rounded-xl border p-2"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-orange-500 p-2">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {selectedAddress.title}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {selectedAddress.address}
                    </p>
                  </div>
                </div>
                <Edit size={20} />
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="h-auto w-full justify-between rounded-xl p-2"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-orange-500 p-2">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">Add Address</span>
                </div>
                <div className="rounded-full bg-orange-500 p-1">
                  <Plus className="h-4 w-4 text-white" />
                </div>
              </Button>
            )}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select an Addresss</DialogTitle>
              <DialogDescription>
                Select an address for you order
              </DialogDescription>
            </DialogHeader>
            <div>
              {addressList &&
                addressList.map((address) => (
                  <Button
                    key={address.id}
                    variant="ghost"
                    className="h-auto w-full justify-between rounded-xl p-2"
                    onClick={() => setSelectedAddress(address)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-500 p-2">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{address.title}</span>

                          {address.is_default == 1 && (
                            <Badge
                              className="h-4 text-xs"
                              variant={"secondary"}
                            >
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">
                          {address.address}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
              {error && <p>Couldnt fetch addresses</p>}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SelectAddress;
