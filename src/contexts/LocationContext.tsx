"use client";

import React, { PropsWithChildren } from "react";

import { Location } from "@/types/shared.types";

interface LocationContextType {
  location: Location | null;
  setLocation: (location: Location) => void;
}

const LocationContext = React.createContext<LocationContextType | undefined>(
  undefined,
);

const LocationProvider = ({ children }: PropsWithChildren) => {
  const [location, setLocation] = React.useState<Location | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = React.useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export default LocationProvider;
