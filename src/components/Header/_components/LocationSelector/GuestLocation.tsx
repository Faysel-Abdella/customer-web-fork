"use client";

import { useEffect } from "react";

import { MapPin } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLocation } from "@/contexts/LocationContext";
import useGeolocation from "@/hooks/useGeolocation";

const GuestLocation = () => {
  const { address, location } = useGeolocation();
  const { setLocation } = useLocation();
  console.log("i am here");

  useEffect(() => {
    if (location) {
      setLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }, [location, setLocation]);
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="bg-secondary flex h-10 w-32 items-center gap-2 rounded-lg px-2 text-sm font-semibold">
          <MapPin className="h-4 w-4 min-w-4" />
          <span className="truncate text-nowrap">
            {address ? address : "Location"}
          </span>
        </div>
      </TooltipTrigger>
      {address && (
        <TooltipContent>
          <p>{address}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default GuestLocation;
