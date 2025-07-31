import React, { useState } from "react";

import { Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useFilter from "@/hooks/useFilter";
import { cn } from "@/lib/utils";

const offers = [20, 45, 50, 60];

interface OffersFilterProps {
  className?: string;
}
const OffersFilter = ({ className }: OffersFilterProps) => {
  const { applyFilters, activeValue } = useFilter("offer", "");

  const [value, setValue] = useState(activeValue);

  const handleFilter = (offer: string) => {
    if (value == offer) {
      setValue("");
      applyFilters("");
    } else {
      setValue(offer);
      applyFilters(offer);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("rounded-full", className)}>
          <Tag className="rotate-180" />
          Offers
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Offers</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={handleFilter}>
          {offers.map((offer) => (
            <DropdownMenuRadioItem
              key={offer}
              value={offer.toString()}
              id={`offer_${offer}`}
            >
              Upto {offer}% off
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OffersFilter;
