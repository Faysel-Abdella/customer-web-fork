"use client";
import { FormEvent, useEffect, useState, useTransition } from "react";

import { toast } from "sonner";

import { addToCartAction } from "@/actions/cart.actions";
import { getMenuItemDetail } from "@/actions/restaurants.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { usePathname } from "@/i18n/navigation";
import { objectToFormData } from "@/lib/utils";
import { MenuItem } from "@/types/restaurant.types";

import AddToCartForm from "./AddToCartForm";
import MenuItemDetailSkeleton from "./MenuItemDetailSkeleton";
import MenuItemDisplay from "./MenuItemDisplay";

interface MenuItemDetailProps {
  menuItemId: string;
  className?: string;
}

const MenuItemDetail = ({ menuItemId, className }: MenuItemDetailProps) => {
  const [menuItem, setMenuItem] = useState<MenuItem>();
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();
  const [isPending, startTransition] = useTransition();
  const [itemQuantity, setItemQuantity] = useState(1);
  const [selectedAddonIds, setSelectedAddonIds] = useState<number[]>([]);
  const { refreshCart, currentRestaurantId } = useCart();
  const [isClearCartOpen, setClearCartOpen] = useState(false);
  const [isLoadingItem, startLoadingItem] = useTransition();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !currentRestaurantId ||
      currentRestaurantId.toString() === menuItem?.restaurant_id.toString()
    ) {
      handleAddToCart();
    } else {
      setClearCartOpen(true);
    }
  };

  const handleAddToCart = async (clearCart?: boolean) => {
    if (!menuItem) return;

    const getSelectedAddons = () => {
      return menuItem.addOnsList
        .filter((item) => selectedAddonIds.includes(item.id))
        .map((item) => ({
          add_on_id: item.id.toString(),
          price: item.price.toString(),
        }));
    };

    const data = objectToFormData({
      "Cart[store_id]": menuItem.restaurant_id.toString(),
      "Cart[type_id]": menuItem.type_id.toString(),
      "CartItem[price_id]": menuItem.itemPrice[0].id.toString(),
      "CartItem[product_id]": menuItem.id.toString(),
      "CartItem[quantity]": itemQuantity.toString(),
      "Cart[addones]": getSelectedAddons(),
    });

    startTransition(async () => {
      const results = await addToCartAction(data, clearCart);
      if (results.error) {
        toast.error("Failed to add item to cart", {
          description: results.error,
        });
      } else {
        toast.success("Successfully added item to cart");
        refreshCart();
      }
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    startLoadingItem(async () => {
      const data = await getMenuItemDetail(menuItemId);
      if (data.error) {
        toast.error("Failed to fetch menu item details", {
          description: data.error,
        });
        setIsOpen(false);
      } else {
        setMenuItem(data.data);
      }
    });
  }, [menuItemId, isOpen]);

  return (
    <>
      <AlertDialog open={isClearCartOpen} onOpenChange={setClearCartOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear cart?</AlertDialogTitle>
            <AlertDialogDescription>
              The items in your cart are from another restaurant. If you
              proceed, the items currently in your cart will be cleared.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAddToCart(true)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className={className}>View details</Button>
        </DialogTrigger>
        <DialogContent className="max-h-dvh overflow-auto p-0 max-sm:w-dvw max-sm:min-w-dvw">
          {isLoadingItem ? (
            <MenuItemDetailSkeleton />
          ) : (
            menuItem && (
              <>
                <MenuItemDisplay
                  menuItem={menuItem}
                  selectedAddonIds={selectedAddonIds}
                  setSelectedAddonIds={setSelectedAddonIds}
                />
                <AddToCartForm
                  menuItem={menuItem}
                  itemQuantity={itemQuantity}
                  setItemQuantity={setItemQuantity}
                  handleSubmit={handleSubmit}
                  isPending={isPending}
                  selectedAddonIds={selectedAddonIds}
                  setPreviousPath={() =>
                    localStorage.setItem("previousPath", currentPath)
                  }
                />
              </>
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuItemDetail;
