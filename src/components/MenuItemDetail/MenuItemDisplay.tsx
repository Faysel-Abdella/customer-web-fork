"use client";

import DOMPurify from "dompurify";
import { Clock, Dot } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { getCookTime, getMenuItemPrice } from "@/lib/utils";
import { MenuItem } from "@/types/restaurant.types";

import CustomLink from "../CustomLink";
import FadingDivider from "../FadingDivider";
import QuantityControl from "../QuantityControl";

import AddOnList from "./AddOnList";

interface MenuItemDisplayProps {
  menuItem: MenuItem;
  selectedAddonIds: number[];
  setSelectedAddonIds: React.Dispatch<React.SetStateAction<number[]>>;
  itemQuantity: number;
  setItemQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const MenuItemDisplay = ({
  menuItem,
  selectedAddonIds,
  setSelectedAddonIds,
  itemQuantity,
  setItemQuantity,
}: MenuItemDisplayProps) => {
  const sanitizedDescription = DOMPurify.sanitize(menuItem.description || "", {
    USE_PROFILES: { html: true },
  });

  return (
    <div className="flex-1 space-y-5 overflow-y-auto px-4 pt-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Badge
              variant="secondary"
              className="text-muted-foreground mb-1 rounded-full py-1"
            >
              {menuItem.cuisine_type_name}
            </Badge>
            <p className="text-lg font-medium">{menuItem.title}</p>
            <CustomLink
              href={`/restaurants/${menuItem.restaurant_id}`}
              className="text-muted-foreground flex items-center justify-center gap-1 text-sm hover:underline"
            >
              <Dot />
              <span>See restaurant</span>
            </CustomLink>
          </div>
          <p className="text-xl font-semibold">
            ${getMenuItemPrice(menuItem).toFixed(2)}
          </p>
        </div>

        <div className="text-muted-foreground flex items-center gap-1">
          <Clock size={16} /> {getCookTime(menuItem.cook_time)}
          <span> min</span>
        </div>
      </div>

      <div className="space-y-2 pb-4">
        <p className="font-bold">Description</p>
        <p
          className="text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      </div>

      <div className="flex items-center justify-between">
        <p>Quantity</p>
        <QuantityControl
          setItemQuantity={setItemQuantity}
          itemQuantity={itemQuantity}
        />
      </div>

      <FadingDivider />

      <AddOnList
        addOns={menuItem.addOnsList}
        selectedAddonIds={selectedAddonIds}
        setSelectedAddonIds={setSelectedAddonIds}
      />
    </div>
  );
};

export default MenuItemDisplay;
