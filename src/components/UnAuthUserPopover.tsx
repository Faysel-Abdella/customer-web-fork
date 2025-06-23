import React from "react";

import { User } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "./ui/button";
const UnAuthUserPopover = ({ className }: React.ComponentProps<"div">) => {
  return (
    <Popover>
      <PopoverTrigger className={className}>
        <User />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <p>Login or Create an account</p>
        <Button>Login</Button>
      </PopoverContent>
    </Popover>
  );
};

export default UnAuthUserPopover;
