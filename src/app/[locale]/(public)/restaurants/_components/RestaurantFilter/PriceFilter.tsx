"use client";
import { useState } from "react";

import { ChevronDown, DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface PriceFilterProps {
  className?: string;
}
const PriceFilter = ({ className }: PriceFilterProps) => {
  const [values, setValues] = useState([0, 500]);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className={cn("rounded-full", className)}>
            <DollarSign />
            <span>Price</span>
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-4 p-5">
          <Label className="mb-6">Price per person</Label>
          <DualRangeSlider
            label={(value) => <span>{value}$</span>}
            value={values}
            onValueChange={setValues}
            min={0}
            max={500}
            step={1}
          />
          <div className="flex gap-4">
            <Checkbox id="freeDelivery" className="border-foreground" />
            <Label htmlFor="freeDelivery">Free delivery</Label>
          </div>
          <div className="flex w-full justify-end">
            <Button>Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PriceFilter;
