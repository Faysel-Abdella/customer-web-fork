import { MultiSelect } from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";

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
  className?: string;
}
const CategoryFilter = ({ className }: CategoryFilterProps) => {
  return (
    <MultiSelect
      options={restaurantCategories}
      onValueChange={(e) => {
        console.log(e);
      }}
      // defaultValue={filters.category}
      // value={filters.category}
      placeholder="Select categories"
      variant="inverted"
      maxCount={3}
      className={cn("text-foreground w-fit rounded-full", className)}
    />
  );
};

export default CategoryFilter;
