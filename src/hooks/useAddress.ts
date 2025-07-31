import { useCallback, useEffect, useState, useTransition } from "react";

import { getAddressList } from "@/actions/profile.actions";
import { useAuth } from "@/contexts/AuthContext";
import { Address } from "@/types/profile.types";

export default function useAddress() {
  const { isAuthenticated } = useAuth();

  const [addressList, setAddressList] = useState<Address[] | null>(null);
  const [defaultAddress, setDefaulAddress] = useState<Address | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [isChecking, startChecking] = useTransition();

  const fetchLocations = useCallback(async () => {
    const { data, error } = await getAddressList();
    if (data) {
      setAddressList(data);
    }
    if (error) {
      setAddressError(error);
    }
  }, []);

  const setCurrentAddress = useCallback(() => {
    const savedAddressRaw = localStorage.getItem("defaultAddress");
    if (savedAddressRaw) {
      try {
        const address: Address = JSON.parse(savedAddressRaw);
        setDefaulAddress(address);
        return;
      } catch {
        console.log("Invalid address in localStorage.");
        localStorage.removeItem("defaultAddress");
      }
    }

    if (addressList) {
      const apiDefault = addressList.find((item) => item.is_default == 1);
      if (apiDefault) {
        setDefaulAddress(apiDefault);
        localStorage.setItem("defaultAddress", JSON.stringify(apiDefault));
      }
    }
  }, [addressList]);

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentAddress();
    }
  }, [setCurrentAddress, isAuthenticated]);

  useEffect(() => {
    if (!addressList) return;

    startChecking(() => {
      const backendDefault = addressList.find((item) => item.is_default == 1);
      if (!backendDefault) return;

      const savedAddressRaw = localStorage.getItem("defaultAddress");
      if (savedAddressRaw) {
        try {
          const savedAddress: Address = JSON.parse(savedAddressRaw);
          if (savedAddress.id !== backendDefault.id) {
            localStorage.setItem(
              "defaultAddress",
              JSON.stringify(backendDefault),
            );
            setDefaulAddress(backendDefault);
          }
        } catch {
          localStorage.setItem(
            "defaultAddress",
            JSON.stringify(backendDefault),
          );
          setDefaulAddress(backendDefault);
        }
      }
    });
  }, [addressList]);

  return {
    addressList,
    fetchLocations,
    defaultAddress,
    addressError,
    isChecking,
  };
}
