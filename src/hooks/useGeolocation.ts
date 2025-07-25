import { useEffect, useState } from "react";

import { reverseGeocode } from "@/actions/actions";

export default function useGeolocation() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [address, setAddress] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAddress = async (latitude: number, longitude: number) => {
    const data = await reverseGeocode(latitude, longitude);
    if (data) {
      setAddress(data);
    } else {
      setAddressError("Unable to fetch address");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          fetchAddress(position.coords.latitude, position.coords.longitude);
          setError(null);
        },
        (err) => {
          setError(err.message);
          setLocation(null);
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return { location, error, address, addressError };
}
