"use client";

import { useEffect } from "react";

import { useLocation } from "@/contexts/LocationContext";
import useGeolocation from "@/hooks/useGeolocation";

const GuestLocation = () => {
  const { location } = useGeolocation();
  const { setLocation } = useLocation();
  console.log("i");

  useEffect(() => {
    if (location) {
      setLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }, [location, setLocation]);
  return <></>;
};

export default GuestLocation;
