"use client";
import { FormEvent } from "react";

import { Loader2, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "@/i18n/navigation";
import { MenuItem } from "@/types/restaurant.types";

interface AddToCartFormProps {
  menuItem: MenuItem;
  itemQuantity: number;
  setItemQuantity: (value: number) => void;
  handleSubmit: (e: FormEvent) => void;
  isPending: boolean;
  selectedAddonIds: number[];
  setPreviousPath: () => void;
}

const AddToCartForm = ({
  menuItem,
  itemQuantity,
  setItemQuantity,
  handleSubmit,
  isPending,
  selectedAddonIds,
  setPreviousPath,
}: AddToCartFormProps) => {
  const { user } = useAuth();

  const calculateAddOnPrice = () => {
    return menuItem.addOnsList.reduce((total, item) => {
      return selectedAddonIds.includes(item.id)
        ? total + parseInt(item.price)
        : total;
    }, 0);
  };

  const addOnPrice = calculateAddOnPrice();
  const basePrice = parseInt(menuItem.itemPrice[0].price);
  const totalPrice = (basePrice + addOnPrice) * itemQuantity;

  return (
    <DialogFooter className="border-t p-4">
      {user ? (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <p>Quantity:</p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
              >
                <Minus />
              </Button>
              <Input
                className="w-28 text-center"
                type="number"
                min={1}
                max={10}
                value={itemQuantity}
                onChange={(e) => setItemQuantity(parseInt(e.target.value))}
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => setItemQuantity(Math.min(10, itemQuantity + 1))}
              >
                <Plus />
              </Button>
            </div>
          </div>
          <div className="border-primary flex justify-between rounded-lg border p-2">
            <div>
              <p>Item price</p>
              <p>Add-on price</p>
              <p className="font-bold">Total price</p>
            </div>
            <div className="text-right">
              <p>{basePrice}$</p>
              <p>{addOnPrice}$</p>
              <p className="text-primary font-bold">{totalPrice}$</p>
            </div>
          </div>
          <Button
            disabled={isPending || itemQuantity <= 0}
            className="w-full"
            type="submit"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Add to cart"}
          </Button>
        </form>
      ) : (
        <Button className="w-full" asChild onClick={setPreviousPath}>
          <Link href="/login">Login to Order</Link>
        </Button>
      )}
    </DialogFooter>
  );
};

export default AddToCartForm;
