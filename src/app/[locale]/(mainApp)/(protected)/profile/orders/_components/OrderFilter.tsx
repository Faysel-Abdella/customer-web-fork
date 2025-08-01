"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const OrderFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentStatus = searchParams.get("state_id") || "1";

  const handleFilterChange = (value: string) => {
    if (!value) return;

    const params = new URLSearchParams();

    if (value === "5") {
      params.set("state_id", "5");
    } else {
      params.delete("state_id");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <ToggleGroup
        type="single"
        className="bg-secondary p-1"
        value={currentStatus}
        onValueChange={handleFilterChange}
      >
        <ToggleGroupItem
          value="1"
          className="data-[state=on]:bg-background rounded-md"
        >
          Active orders
        </ToggleGroupItem>
        <ToggleGroupItem
          value="5"
          className="data-[state=on]:bg-background rounded-md"
        >
          Past orders
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default OrderFilter;
