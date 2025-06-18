import { cn } from "@/lib/utils";
import { Utensils } from "lucide-react";
import React from "react";

interface logoProps {
  className?: string;
}
const Logo = ({ className }: logoProps) => {
  return (
    <div
      className={cn(
        "size-16  bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg",
        className
      )}
    >
      <Utensils className='text-background' />
    </div>
  );
};

export default Logo;
