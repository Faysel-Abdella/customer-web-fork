"use client";
import React, { useState } from "react";

// import { useSearchParams } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const OrderFilter = () => {
  //   const searchParams = useSearchParams();
  const [status, setStatus] = useState("a");
  return (
    <div>
      <ToggleGroup
        defaultValue="a"
        type="single"
        className="bg-secondary p-1"
        value={status}
        onValueChange={(e) => setStatus(e)}
      >
        <ToggleGroupItem
          value="a"
          className="data-[state=on]:bg-background rounded-md rounded-l-md"
        >
          Active orders
        </ToggleGroupItem>
        <ToggleGroupItem
          value="b"
          className="data-[state=on]:bg-background rounded-md rounded-r-md"
        >
          Past orders
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default OrderFilter;
