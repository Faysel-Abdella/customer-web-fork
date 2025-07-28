"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useLocation } from "@/contexts/LocationContext";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocationHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { location } = useLocation();

  const latInUrl = searchParams.get("lat");
  const lngInUrl = searchParams.get("lon");

  console.log("location in handler:", location);

  useEffect(() => {
    console.log("started url location update");
    if (!location) {
      return;
    }
    console.log(latInUrl, lngInUrl);
    console.log("2");
    const { latitude, longitude } = location;
    const params = new URLSearchParams(searchParams.toString());

    if (latInUrl !== null && lngInUrl !== null) {
      const isLocationSame =
        Number(latInUrl).toFixed(6) === latitude.toFixed(6) &&
        Number(lngInUrl).toFixed(6) === longitude.toFixed(6);

      if (isLocationSame) {
        return;
      }
    }
    console.log(location);
    if (latitude == 0 && longitude == 0) {
      params.set("lat", "");
      params.set("lon", "");
    } else {
      params.set("lat", latitude.toString());
      params.set("lon", longitude.toString());
    }
    // console.log("router.replace called to update location");
    router.replace(`${pathname}?${params.toString()}`);
  }, [location, pathname, router, latInUrl, lngInUrl, searchParams]);

  return null;
}
