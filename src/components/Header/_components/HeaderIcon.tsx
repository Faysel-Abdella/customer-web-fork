import React from "react";

import { Button } from "@/components/ui/button";

const HeaderIcon = ({ children }: React.ComponentProps<"button">) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-foreground hover:bg-secondary hover:text-secondary-foreground relative flex size-10 cursor-pointer items-center justify-center transition-all hover:rounded-lg"
    >
      {children}
    </Button>
  );
};

export default HeaderIcon;
