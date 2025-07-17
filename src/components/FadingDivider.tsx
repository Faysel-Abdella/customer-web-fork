import React from "react";

import { cn } from "@/lib/utils";

interface FadingDividerProps {
  className?: string;
}
const FadingDivider = ({ className }: FadingDividerProps) => {
  return (
    <div
      className={cn(
        "via-border h-px w-full bg-gradient-to-r from-transparent to-transparent",
        className,
      )}
    />
  );
};

export default FadingDivider;
