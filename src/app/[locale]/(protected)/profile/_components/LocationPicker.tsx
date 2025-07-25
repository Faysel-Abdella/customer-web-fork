"use client";

import React, { useCallback, useRef, useState } from "react";

import {
  Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const defaultCenter = {
  lat: 8.5413,
  lng: 39.2689,
};

const libraries: "places"[] = ["places"];

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
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API!,
    libraries,
  });
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [selectedAddress, setSelectedAddress] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const geocodePosition = (pos: google.maps.LatLngLiteral) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: pos }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        setSelectedAddress(results[0].formatted_address);
      } else {
        setSelectedAddress("Address not found.");
        // console.error("Geocoder failed due to: " + status);
      }
    });
  };

  const handlePlaceSelect = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const newPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        mapRef.current?.panTo(newPosition);
        setMarkerPosition(newPosition);
        geocodePosition(newPosition);
      }
    }
  }, []);

  const handleMarkerDragEnd = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newPosition = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setMarkerPosition(newPosition);
        geocodePosition(newPosition);
      }
    },
    [],
  );
  if (loadError) {
    return <div className="h-[400px]">Error loading maps.</div>;
  }

  if (!isLoaded) {
    return (
      <div
        className={cn(
          "bg-muted-foreground flex h-96 w-full animate-pulse items-center justify-center rounded-lg",
          className,
        )}
      >
        Loading Map...
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <p className="text-muted-foreground mb-2 text-sm">
        Drag the pin or search for a location to select an address.
      </p>
      <Autocomplete
        onLoad={(ref) => (autocompleteRef.current = ref)}
        onPlaceChanged={handlePlaceSelect}
      >
        <Input
          type="text"
          placeholder="Search for a location or address"
          className="mb-4"
        />
      </Autocomplete>

      <div className="h-96 w-full overflow-hidden rounded-lg">
        <GoogleMap
          mapContainerClassName="w-full h-full"
          center={markerPosition}
          zoom={15}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        </GoogleMap>
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
              Lat: {markerPosition.lat.toFixed(6)}, Lng:{" "}
              {markerPosition.lng.toFixed(6)}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground">No location selected yet.</p>
        )}
        <Button
          onClick={() =>
            onLocationSelect({
              address: selectedAddress,
              position: markerPosition,
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
