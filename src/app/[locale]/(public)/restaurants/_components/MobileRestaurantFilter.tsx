"use client";
import { useState } from "react";

import { DialogDescription } from "@radix-ui/react-dialog";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import RestaurantsFilters from "./RestaurantsFilters";

const MobileRestaurantFilter = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="border lg:hidden">
          <SlidersHorizontal /> Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-dvh overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Restaurant filters</DialogTitle>
          <DialogDescription className="sr-only">
            mobile restaurant filters
          </DialogDescription>
        </DialogHeader>
        <RestaurantsFilters isMobile className="flex flex-col" />
      </DialogContent>
    </Dialog>
  );
};

export default MobileRestaurantFilter;
