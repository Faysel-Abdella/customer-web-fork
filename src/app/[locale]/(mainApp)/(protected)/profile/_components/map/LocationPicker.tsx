"use client";

import React, { useCallback, useState, useEffect } from "react";

import {
  APIProvider,
  Map,
  Marker,
  ControlPosition,
} from "@vis.gl/react-google-maps";
import useGeolocation from "@/hooks/useGeolocation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AutocompleteControl from "./AutocompleteControl";
import AutocompleteResult from "./AutocompleteResult";

const defaultCenter = {
  lat: 25.348766,
  lng: 55.405403,
};
interface LocationPickerProps {
  className?: string;
  onLocationSelect: (location: {
    address: string;
    position: google.maps.LatLngLiteral;
  }) => void;
  noAddressError: boolean;
}

export function LocationPicker({
  onLocationSelect,
  className,
  noAddressError,
}: LocationPickerProps) {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API!;

  const { getGuestUserLocation, guestLocation } = useGeolocation();
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral>({
      lat: guestLocation?.latitude as number,
      lng: guestLocation?.longitude as number,
    });

  // New state to track the selected map location
  const [selectedMapLocation, setSelectedMapLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  // For the autocomplete result
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.Place | null>(null);

  const [selectedAddress, setSelectedAddress] = useState("");

  // Sometimes the guestLocation is not available immediately, so we need check in 2sec and if re-assign the currentLocation
  useEffect(() => {
    console.log("guestLocation", guestLocation);
    // Only do this is the currentLocation is empty
    if (!currentLocation.lat && !currentLocation.lng) {
      const timer = setTimeout(() => {
        setCurrentLocation({
          lat: guestLocation?.latitude as number,
          lng: guestLocation?.longitude as number,
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [guestLocation]);

  useEffect(() => {
    // Only get location once when component mounts
    if (!guestLocation) {
      getGuestUserLocation();
    }

    if (guestLocation) {
      const newLocation = {
        lat: guestLocation.latitude,
        lng: guestLocation.longitude,
      };
      // Only update if the location actually changed
      if (
        currentLocation.lat !== newLocation.lat ||
        currentLocation.lng !== newLocation.lng
      ) {
        setCurrentLocation(newLocation);
      }
    }
  }, [guestLocation]);

  const geocodePosition = (pos: google.maps.LatLngLiteral) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: pos }, (results, status) => {
      console.log("results", results);
      if (status === "OK" && results?.[0]) {
        setSelectedAddress(results[0].formatted_address);
      } else {
        setSelectedAddress("Address not found.");
      }
    });
  };

  // Handle map click to select location
  const handleMapClick = useCallback((event: any) => {
    console.log("Map click event:", event); // For debugging
    // Access the latLng from the event
    const latLng = event.detail?.latLng || event.latLng;

    if (latLng) {
      const newPosition = {
        lat: latLng.lat,
        lng: latLng.lng,
      };
      setSelectedMapLocation(newPosition);
      geocodePosition(newPosition);
    }
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <p className="text-muted-foreground mb-2 text-sm">
        Click on the map or search to select a location.
      </p>

      <div className="h-96 w-full overflow-hidden rounded-lg">
        {/* Only show tha map when the currentLocation is available */}
        {currentLocation.lat && currentLocation.lng && (
          <>
            <APIProvider apiKey={API_KEY} libraries={["places", "marker"]}>
              <Map
                style={{ width: "full", height: "100vh" }}
                defaultCenter={{
                  lat: currentLocation.lat,
                  lng: currentLocation.lng,
                }}
                defaultZoom={15}
                gestureHandling={"greedy"}
                disableDefaultUI={false}
                onClick={handleMapClick}
              />
              <Marker
                position={
                  selectedMapLocation || {
                    lat: currentLocation.lat,
                    lng: currentLocation.lng,
                  }
                }
                clickable
              />
              <AutocompleteControl
                controlPosition={ControlPosition.LEFT_TOP}
                onPlaceSelect={setSelectedPlace}
              />

              <AutocompleteResult place={selectedPlace} />
            </APIProvider>
          </>
        )}
      </div>

      <div
        className={cn(
          "bg-secondary mt-4 rounded-lg border p-4",
          noAddressError && "ring-2 ring-red-400",
        )}
      >
        <h3 className="text-lg font-bold">Selected Location:</h3>
        {selectedAddress ? (
          <div>
            <p className="">{selectedAddress}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              Lat: {selectedMapLocation?.lat.toFixed(6)}, Lng:{" "}
              {selectedMapLocation?.lng.toFixed(6)}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground">No location selected yet.</p>
        )}
        <Button
          onClick={() =>
            onLocationSelect({
              address: selectedAddress,
              position: selectedMapLocation as google.maps.LatLngLiteral,
            })
          }
          disabled={
            !selectedAddress || selectedAddress === "Address not found."
          }
        >
          Confirm Location
        </Button>
      </div>
      {noAddressError && (
        <div className="text-red-400">Please select a location on the map.</div>
      )}
    </div>
  );
}
