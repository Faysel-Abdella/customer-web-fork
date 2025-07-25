import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RestaurantFilters } from ".";

const restaurantSortTypes = [
  {
    label: "Price: Low to High",
    value: "1",
  },
  {
    label: "Price: High to Low",
    value: "2",
  },
  {
    label: "Previously Ordered",
    value: "3",
  },
];

interface SortRestaurantsProps {
  filters: RestaurantFilters;
  setFilters: React.Dispatch<React.SetStateAction<RestaurantFilters>>;
}
const SortRestaurants = ({ filters, setFilters }: SortRestaurantsProps) => {
  return (
    <div>
      <Label className="mb-2">Sort</Label>
      <Select
        value={filters.sort_by}
        defaultValue={filters.sort_by}
        onValueChange={(value: string) =>
          setFilters((prev) => ({ ...prev, sort_by: value }))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue />
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
    </div>
  );
};

export default SortRestaurants;
