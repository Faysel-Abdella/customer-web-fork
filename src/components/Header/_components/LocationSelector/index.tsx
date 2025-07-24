"use client";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";

import GuestLocation from "./GuestLocation";
import LoggedInLocation from "./LoggedInLocation";

const LocationSelector = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Skeleton className="h-10 w-32" />;
  if (!user) return <GuestLocation />;
  if (user) return <LoggedInLocation />;
};

export default LocationSelector;
