import React from "react";

import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";

import { RestaurantFilters } from ".";

const restaurantCategories = [
  {
    label: "Food",
    value: "0",
  },
  {
    label: "Drink",
    value: "1",
  },
  {
    label: "Others",
    value: "2",
  },
];

interface CategoryFilterProps {
  filters: RestaurantFilters;
  setFilters: React.Dispatch<React.SetStateAction<RestaurantFilters>>;
}
const CategoryFilter = ({ filters, setFilters }: CategoryFilterProps) => {
  return (
    <div>
      <Label className="mb-2">Category</Label>
      <MultiSelect
        options={restaurantCategories}
        onValueChange={(e) =>
          setFilters((prev) => ({ ...prev, categories: e }))
        }
        defaultValue={filters.categories}
        value={filters.categories}
        placeholder="Select categories"
        variant="inverted"
        maxCount={3}
      />
    </div>
  );
};

export default CategoryFilter;
