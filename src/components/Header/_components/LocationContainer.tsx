"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { createContext, useContext } from "react";

import { toast } from "sonner";

import { getAddressList, setDefaultAddress } from "@/actions/profile.actions";
import { useLocation } from "@/contexts/LocationContext";
import { Address } from "@/types/profile.types";

interface LoggedLocationContextType {
  addressList: Address[] | null;
  isLoading: boolean;
  defaultAddress?: Address;
  handleSetDefaultAddress: (address: Address) => void;
  isUpdating: boolean;
  isOpen: boolean;
  isError: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoggedLocationContext = createContext<
  LoggedLocationContextType | undefined
>(undefined);

export const useLoggedLocationContext = () => {
  const context = useContext(LoggedLocationContext);
  if (context === undefined) {
    throw new Error(
      "useLoggedLocationContext must be used within a LocationContainer",
    );
  }
  return context;
};

const LocationContainer = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [addressList, setAddressList] = useState<Address[] | null>(null);
  const [isUpdating, startUpdate] = useTransition();
  const [isOpen, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setLocation } = useLocation();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      const result = await getAddressList();
      if (result.data) {
        setAddressList(result.data);
      }
      setIsLoading(false);
    };
    fetchLocations();
  }, []);

  const defaultAddress = addressList?.find((addr) => addr.is_default === 1);

  const selectDefaultAddress = useCallback(() => {
    if (!addressList) {
      return;
    }
    const defaultAddress = addressList.find((item) => item.is_default == 1);

    if (!defaultAddress) {
      setLocation({
        latitude: 0,
        longitude: 0,
      });
      return;
    } else {
      setLocation({
        latitude: parseFloat(defaultAddress.latitude),
        longitude: parseFloat(defaultAddress.longitude),
      });
    }
  }, [addressList, setLocation]);

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
    setIsError(false);
    startTransition(async () => {
      const result = await getAddressList();
      if (result.data) {
        setAddressList(result.data);
      } else if (result.error) {
        setIsError(true);
        console.log(result.error);
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

  const value = {
    addressList,
    isLoading,
    defaultAddress,
    handleSetDefaultAddress,
    isUpdating,
    isOpen,
    setOpen,
    isError,
  };

  return (
    <LoggedLocationContext.Provider value={value}>
      {children}
    </LoggedLocationContext.Provider>
  );
};

export default LocationContainer;
