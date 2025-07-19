"use client";
import React, { useState } from "react";
import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { AddOn } from "@/types/restaurant.types";

interface AddOnListProps {
  addOns: AddOn[];
  selectedAddonIds: number[];
  setSelectedAddonIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const AddOnListItem = ({
  addOn,
  selectedAddonIds,
  setSelectedAddonIds,
}: {
  addOn: AddOn;
  selectedAddonIds: number[];
  setSelectedAddonIds: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(
    selectedAddonIds.includes(addOn.id),
  );

  return (
    <div
      className={cn("flex cursor-pointer items-center justify-between p-2")}
      onClick={() => {
        if (isSelected) {
          setSelectedAddonIds((prev) =>
            prev.filter((addonId) => addonId != addOn.id),
          );
          setIsSelected(false);
        } else {
          setSelectedAddonIds((prev) => [...prev, addOn.id]);
          setIsSelected(true);
        }
      }}
    >
      <div className="flex gap-4">
        <div className="relative size-14 overflow-hidden rounded-xl">
          <Image
            src={
              addOn.add_on_category_id.image ||
              "/assets/images/add_on_placeholder.jpg"
            }
            alt="add on image"
            fill
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-lg font-semibold">{addOn.title}</p>
          <p className="text-primary font-semibold">{addOn.price}$</p>
        </div>
      </div>
      <Checkbox checked={isSelected} />
    </div>
  );
};

const AddOnList = ({
  addOns,
  selectedAddonIds,
  setSelectedAddonIds,
}: AddOnListProps) => {
  return (
    <div className="space-y-2">
      {addOns.length > 0 && <p className="font-medium">Add-ons</p>}
      <div className="space-y-4">
        {addOns.map((addOn) => (
          <AddOnListItem
            key={addOn.id}
            addOn={addOn}
            selectedAddonIds={selectedAddonIds}
            setSelectedAddonIds={setSelectedAddonIds}
          />
        ))}
      </div>
    </div>
  );
};

export default AddOnList;
