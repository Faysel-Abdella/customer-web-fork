"use client";
import React, { useState } from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
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
    <Card
      className={cn(
        "cursor-pointer p-0",
        isSelected && "border-primary border",
      )}
    >
      <CardContent
        className={cn("flex cursor-pointer justify-between p-2")}
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
        <div className="flex gap-5">
          <div className="relative size-20 overflow-hidden rounded">
            <Image
              src={
                addOn.add_on_category_id.image ||
                "/assets/images/add_on_placeholder.jpg"
              }
              alt="add on image"
              fill
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold">{addOn.title}</p>
            <p className="text-primary font-semibold">{addOn.price}$</p>
          </div>
        </div>
        <div className="">
          <Checkbox checked={isSelected} />
        </div>
      </CardContent>
    </Card>
  );
};

const AddOnList = ({
  addOns,
  selectedAddonIds,
  setSelectedAddonIds,
}: AddOnListProps) => {
  return (
    <div className="space-y-2">
      {addOns.length > 0 && <p className="font-bold">Addons</p>}
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
