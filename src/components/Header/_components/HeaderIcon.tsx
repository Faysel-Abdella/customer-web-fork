import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderIconProps {
  children: React.ReactNode;
  className?: string;
}
const HeaderIcon = ({ children, className }: HeaderIconProps) => {
  return (
    <Button variant="default" size="icon" className={cn(className)}>
      {children}
    </Button>
  );
};

export default HeaderIcon;
