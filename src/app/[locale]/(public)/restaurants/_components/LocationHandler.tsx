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

  useEffect(() => {
    if (!location) {
      return;
    }

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
    if (latitude == 0 && longitude == 0) {
      params.set("lat", "");
      params.set("lon", "");
    } else {
      params.set("lat", latitude.toString());
      params.set("lon", longitude.toString());
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [location, pathname, router, latInUrl, lngInUrl, searchParams]);

  return null;
}
