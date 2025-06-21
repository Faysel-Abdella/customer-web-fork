import React from "react";

import { Button } from "@/components/ui/button";

const HeaderIcon = ({ children }: React.ComponentProps<"button">) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative flex size-10 cursor-pointer items-center justify-center text-white transition-all after:absolute after:-bottom-1 after:left-1/2 after:h-[0.5px] after:w-1/2 after:-translate-x-1/2 after:bg-white after:content-[''] hover:rounded-lg hover:bg-white/20 hover:text-white dark:border-white dark:text-white dark:hover:bg-white/20"
    >
      {children}
    </Button>
  );
};

export default HeaderIcon;
