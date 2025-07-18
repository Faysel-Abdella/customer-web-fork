import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const restaurantSortTypes = [
  {
    label: "Price: Low to High",
    value: "SORT_BY_LOW_TO_HIGH",
  },
  {
    label: "Price: High to Low",
    value: "SORT_BY_HIGH_TO_LOW",
  },
  {
    label: "Previously Ordered",
    value: "SORT_BY_PREVIOUS_ORDER",
  },
];

interface SortRestaurantsProps {
  className?: string;
}

const SortRestaurants = ({ className }: SortRestaurantsProps) => {
  return (
    <Select>
      <SelectTrigger
        size="default"
        className={cn(
          "w-28 items-center rounded-full data-[size=default]:h-10",
          className,
        )}
      >
        <SelectValue placeholder="Sort" className="h-12" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">None</SelectItem>
        {restaurantSortTypes.map((sort) => (
          <SelectItem key={sort.value} value={sort.value}>
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortRestaurants;
