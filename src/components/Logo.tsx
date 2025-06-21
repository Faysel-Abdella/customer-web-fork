import React from "react";

import { Utensils } from "lucide-react";

import { cn } from "@/lib/utils";

interface logoProps {
  className?: string;
}
const Logo = ({ className }: logoProps) => {
  return (
    <div
      className={cn(
        "flex size-16 items-center justify-center rounded-2xl border-2 border-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg",
        className,
      )}
    >
      <Utensils className="text-white" />
    </div>
  );
};

export default Logo;
