"use client";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

import GuestLocation from "./GuestLocation";
import LoggedInLocation from "./LoggedInLocation";

interface LocationSelectorProps {
  className?: string;
  skeletonClassName?: string;
}
const LocationSelector = ({
  className,
  skeletonClassName,
}: LocationSelectorProps) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Skeleton className={cn("h-10 w-32", className)} />;
  if (!user) return <GuestLocation />;
  if (user)
    return (
      <LoggedInLocation
        className={className}
        skeletonClassName={skeletonClassName}
      />
    );
};

export default LocationSelector;
