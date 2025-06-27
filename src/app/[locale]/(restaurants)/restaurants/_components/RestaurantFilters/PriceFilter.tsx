import React from "react";

import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";

import { RestaurantFilters } from ".";

interface PriceFilterProps {
  filters: RestaurantFilters;
  setFilters: React.Dispatch<React.SetStateAction<RestaurantFilters>>;
}
const PriceFilter = ({ filters, setFilters }: PriceFilterProps) => {
  return (
    <div>
      <Label className="mb-10">Price</Label>
      <div className="flex w-full items-center gap-4">
        <DualRangeSlider
          label={(value) => <span>{value}$</span>}
          value={[parseInt(filters.min), parseInt(filters.max)]}
          onValueChange={(e: number[]) =>
            setFilters((prev) => ({
              ...prev,
              min: e[0].toString(),
              max: e[1].toString(),
            }))
          }
          min={0}
          max={500}
          step={1}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
