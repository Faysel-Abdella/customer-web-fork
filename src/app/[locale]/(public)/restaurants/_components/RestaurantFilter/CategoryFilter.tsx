import React, { useEffect } from "react";

import { toast } from "sonner";

import { MultiAsyncSelect } from "@/components/multi-async-select";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import useCategories from "@/hooks/useCategories";
import { Category } from "@/types/restaurant.types";

import { RestaurantFilters } from ".";

interface CategoryFilterProps {
  filters: RestaurantFilters;
  setFilters: React.Dispatch<React.SetStateAction<RestaurantFilters>>;
}

const mapCategories = (categories: Category[]) => {
  const categoryList: { label: string; value: string }[] = [];
  categories.forEach((item) =>
    categoryList.push({ label: item.title, value: item.id.toString() }),
  );
  return categoryList;
};
const CategoryFilter = ({ filters, setFilters }: CategoryFilterProps) => {
  const { categories, isSuccess } = useCategories();
  useEffect(() => {
    if (isSuccess === false) {
      toast.error("Failed at fetching categories");
    }
  }, [isSuccess]);

  if (categories && categories.length > 0)
    return (
      <>
        <Label className="mb-2">Category</Label>
        <MultiAsyncSelect
          options={mapCategories(categories)}
          onValueChange={(value) => {
            console.log(value);
            setFilters((prev) => ({ ...prev, category: value }));
          }}
          value={filters.category}
          maxCount={3}
          className="bg-secondary w-full"
          placeholder="Select categories "
        />
      </>
    );
  if (isSuccess == false) return;
  return (
    <>
      <Label className="mb-2">Category</Label>
      <Skeleton className="h-10 w-full" />
    </>
  );
};

export default CategoryFilter;
