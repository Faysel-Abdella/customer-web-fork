"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

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
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface PriceFilterProps {
  className?: string;
}
const minAllowed = 0;
const maxAllowed = 500;
const step = 1;
const PriceFilter = ({ className }: PriceFilterProps) => {
  const searchParams = useSearchParams();
  const minValue = searchParams.get("min") || minAllowed.toString();
  const maxValue = searchParams.get("max") || maxAllowed.toString();
  const freeDeliveryValue = searchParams.get("freeDelivery") || "false";
  const router = useRouter();
  const pathname = usePathname();

  const [values, setValues] = useState([
    parseInt(minValue),
    parseInt(maxValue),
  ]);
  const [freeDelivery, setFreeDelivery] = useState(
    freeDeliveryValue === "true",
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams);

    if (values[0] == minAllowed) {
      params.delete("min");
    } else {
      params.set("min", values[0].toString());
    }
    if (values[1] == maxAllowed) {
      params.delete("max");
    } else {
      params.set("max", values[1].toString());
    }
    if (freeDelivery == false) {
      params.delete("freeDelivery");
    } else {
      params.set("freeDelivery", "true");
    }

    router.replace(`${pathname}?${params.toString()}`);

    setIsOpen(false);
  };

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("group rounded-full", className)}
          >
            <DollarSign className="mr-2 h-4 w-4" />
            <span>Price</span>
            <ChevronDown className="ml-2 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-4 p-5" align="end">
          <Label className="mb-6 text-base font-medium">Price per person</Label>
          <DualRangeSlider
            label={(value) => <span>${value}</span>}
            value={values}
            onValueChange={setValues}
            min={minAllowed}
            max={maxAllowed}
            step={step}
          />
          <div className="flex items-center gap-3 pt-4">
            <Checkbox
              id="freeDelivery"
              className="border-foreground"
              checked={freeDelivery}
              onCheckedChange={(checked) => {
                if (typeof checked === "boolean") {
                  setFreeDelivery(checked);
                }
              }}
            />
            <Label htmlFor="freeDelivery" className="font-normal">
              Free delivery
            </Label>
          </div>
          <div className="flex w-full justify-end pt-2">
            <Button onClick={handleApplyFilters}>Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PriceFilter;
