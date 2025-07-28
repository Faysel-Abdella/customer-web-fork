"use client";

import { useEffect } from "react";

import { useLocation } from "@/contexts/LocationContext";
import useGeolocation from "@/hooks/useGeolocation";

const GuestLocation = () => {
  const { location } = useGeolocation();
  const { setLocation, location: globalLocations } = useLocation();
  console.log(location);
  console.log("Global location:", globalLocations);

  useEffect(() => {
    if (location != null) {
      setLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } else {
      setLocation({
        latitude: 0,
        longitude: 0,
      });
    }
  }, [location, setLocation]);
  return <></>;
};

export default GuestLocation;
