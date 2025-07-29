import { useCallback, useEffect, useState } from "react";

import { getAddressList } from "@/actions/profile.actions";
import { Address } from "@/types/profile.types";

export default function useAddress() {
  const [addressList, setAddressList] = useState<Address[] | null>(null);
  const [defaultAddress, setDefaulAddress] = useState<Address | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);

  const selectDefaultAddress = useCallback(() => {
    if (!addressList) {
      return;
    }
    const address = addressList.find((item) => item.is_default == 1);
    if (address) setDefaulAddress(address);
  }, [addressList]);

  const fetchLocations = useCallback(async () => {
    const { data, error } = await getAddressList();
    if (data) {
      setAddressList(data);
    }
    if (error) {
      setAddressError(error);
    }
  }, []);

  useEffect(() => {
    if (addressList) {
      selectDefaultAddress();
    }
  }, [addressList, selectDefaultAddress]);

  return { addressList, fetchLocations, defaultAddress, addressError };
}
