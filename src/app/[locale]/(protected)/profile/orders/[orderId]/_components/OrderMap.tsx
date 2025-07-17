"use client";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import { cn } from "@/lib/utils";

const mapCenter = {
  lat: 8.5413,
  lng: 39.2689,
};
const OrderMap = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API!,
  });

  if (!isLoaded) {
    return (
      <div
        className={cn(
          "bg-muted-foreground flex h-80 w-full animate-pulse items-center justify-center rounded-lg",
        )}
      >
        Loading Map...
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="h-80 w-full animate-pulse bg-red-500/50 text-white">
        Error loading maps.
      </div>
    );
  }

  return (
    <div className={cn("h-80 w-full overflow-hidden rounded-lg")}>
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={mapCenter}
        zoom={15}
        options={{
          streetViewControl: false, // Optional: hide street view
          mapTypeControl: false, // Optional: hide map type selector
        }}
      >
        {/* No Marker or other components inside */}
      </GoogleMap>
    </div>
  );
};

export default OrderMap;
