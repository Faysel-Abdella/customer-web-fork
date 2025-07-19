import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { MultiSelect } from "@/components/ui/multi-select";
import useDebounce from "@/hooks/useDebounce";
import { usePathname, useRouter } from "@/i18n/navigation";
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCategories = searchParams.getAll("category") || [];
  const [categories, setCategories] = useState<string[]>(currentCategories);

  console.log(categories);
  const debouncedValue = useDebounce(categories, 500);

  const isInitialMount = useRef(true);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const categoriesFromUrl = params.getAll("category");
    if (categoriesFromUrl.length > 0) {
      setCategories(categoriesFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.delete("category");

    if (debouncedValue.length > 0) {
      debouncedValue.forEach((category) => params.append("category", category));
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedValue, pathname, router, searchParams]);

  return (
    <MultiSelect
      options={restaurantCategories}
      onValueChange={setCategories}
      defaultValue={categories}
      value={categories}
      placeholder="Select categories"
      variant="inverted"
      maxCount={3}
      placeholderClassName="text-foreground"
      className={cn(
        "dark:bg-input/30 w-fit rounded-full text-red-500",
        className,
      )}
    />
  );
};

export default CategoryFilter;
