import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useRouter } from "@/i18n/navigation";

import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

export interface RestaurantFilters {
  category: string[];
  min: string;
  max: string;
  freeDelivery: boolean;
  rating: number;
  highRating: boolean;
  offer: string;
}

const offers = [20, 45, 50, 60];

interface RestaurantFilterProps {
  className?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const RestaurantFilter = ({ className, setOpen }: RestaurantFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValue: RestaurantFilters = {
    category: searchParams.getAll("category"),
    freeDelivery: searchParams.get("freeDelivery") ? true : false,
    min: searchParams.get("min") || "0",
    max: searchParams.get("max") || "500",
    rating: parseInt(searchParams.get("rating") || "0"),
    highRating: searchParams.get("highRating") ? true : false,
    offer: searchParams.get("offer") || "",
  };
  const [filters, setFilter] = useState<RestaurantFilters>(initialValue);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    filters.category.forEach((category) => params.append("category", category));
    if (filters.min == "0") {
      params.delete("min");
    } else {
      params.set("min", filters.min);
    }

    if (filters.max == "500") {
      params.delete("max");
    } else {
      params.set("max", filters.max);
    }

    if (filters.freeDelivery == false) {
      params.delete("freeDelivery");
    } else {
      params.set("freeDelivery", "true");
    }
    if (filters.highRating == false) {
      params.delete("highRating");
    } else {
      params.set("highRating", "true");
    }

    if (filters.rating == 0) {
      params.delete("rating");
    } else {
      params.set("rating", filters.rating.toString());
    }

    if (filters.offer == "") {
      params.delete("offer");
    } else {
      params.set("offer", filters.offer);
    }
    router.replace({
      pathname: "/restaurants",
      query: Object.fromEntries(params),
    });

    if (setOpen) {
      setOpen((prev) => !prev);
    }
  };

  const clearFilters = () => {
    setFilter({
      category: [],
      freeDelivery: false,
      max: "500",
      min: "0",
      rating: 0,
      highRating: false,
      offer: "",
    });
    const params = new URLSearchParams(searchParams);

    Object.keys(filters).forEach((key) => params.delete(key));

    router.replace({
      pathname: "/restaurants",
      query: Object.fromEntries(params),
    });
  };

  return (
    <div className={className}>
      <CategoryFilter setFilters={setFilter} filters={filters} />
      <PriceFilter filters={filters} setFilters={setFilter} />
      <div className="flex gap-4">
        <Checkbox
          id="freeDelivery"
          className="border-foreground"
          checked={filters.freeDelivery}
          onCheckedChange={(e: boolean) =>
            setFilter((prev) => ({ ...prev, freeDelivery: e }))
          }
        />
        <Label htmlFor="freeDelivery">Free delivery</Label>
      </div>
      <div className="flex gap-4">
        <Checkbox
          id="highRating"
          className="border-foreground"
          checked={filters.highRating}
          onCheckedChange={(e: boolean) =>
            setFilter((prev) => ({ ...prev, highRating: e }))
          }
        />
        <Label htmlFor="highRating">High Rating</Label>
      </div>
      <div className="w-full">
        <Label className="mb-4">Rating</Label>
        <Slider
          defaultValue={[1]}
          value={[filters.rating]}
          className="mb-2"
          onValueChange={(e) => {
            setFilter((prev) => ({ ...prev, rating: e[0] }));
          }}
          max={5}
          min={0}
          step={1}
        />
        <div className="flex w-full justify-between">
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index} className="text-xs">
              {index}
            </span>
          ))}
        </div>
      </div>
      <div>
        <Label className="mb-4">Offers</Label>
        <RadioGroup
          defaultValue={filters.offer}
          onValueChange={(e) => setFilter((prev) => ({ ...prev, offer: e }))}
        >
          {offers.map((offer) => (
            <div key={offer} className="flex items-center space-x-2">
              <RadioGroupItem value={offer.toString()} id={`offer_${offer}`} />
              <Label htmlFor={`offer_${offer}`}>Upto {offer}% off</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button className="w-full" onClick={applyFilters}>
        Apply
      </Button>
      <Button
        variant={"outline"}
        className="border-primary w-full"
        onClick={clearFilters}
      >
        Clear
      </Button>
    </div>
  );
};

export default RestaurantFilter;
