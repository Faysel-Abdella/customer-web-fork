import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";

import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";

import { deleteCartItem, updateCartItem } from "@/actions/cart.actions";
import QuantityControl from "@/components/QuantityControl";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import useDebounce from "@/hooks/useDebounce";
import { getAddOns } from "@/lib/utils";
import { CartItem } from "@/types/cart.types";

interface CartListItemProps {
  cartItem: CartItem;
}
const CartListItem = ({ cartItem }: CartListItemProps) => {
  const [itemQuantity, setItemQuantity] = useState(cartItem.quantity);

  const [isDeleting, startDeleteTransition] = useTransition();

  const { refreshCart, silentRefreshCart } = useCart();

  const debouncedQuantity = useDebounce(itemQuantity, 500);

  const initialRender = useRef(true);

  const updateQuantity = useCallback(async () => {
    const result = await updateCartItem(
      cartItem.id.toString(),
      debouncedQuantity.toString(),
    );
    if (result.success) silentRefreshCart();
    if (result.error) {
      toast.error("Error", { description: result.error });
    }
  }, [cartItem.id, silentRefreshCart, debouncedQuantity]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (debouncedQuantity !== cartItem.quantity) {
      updateQuantity();
    }
  }, [debouncedQuantity, cartItem.quantity, updateQuantity]);

  const handleDelete = async () => {
    startDeleteTransition(async () => {
      const result = await deleteCartItem(cartItem.id.toString());
      if (result.error) {
        toast.error("Error", { description: result.error });
      }
      if (result.success) refreshCart();
    });
  };

  return (
    <div
      key={cartItem.id}
      className="flex flex-col items-center gap-4 border-b pb-3"
    >
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex h-full w-full items-center gap-2 md:gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-md">
            <Image
              fill
              src={cartItem.restaurant_items[0].image_file}
              alt={`${cartItem.restaurant_items[0].title}`}
            />
          </div>
          <div className="flex h-full flex-1 flex-col">
            <p className="line-clamp-2 font-medium">
              {cartItem.restaurant_items[0].title}
            </p>
            <p className="text-primary text-sm font-semibold max-md:text-xs">
              ${cartItem.selected_rest_price.price}
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-end md:w-min md:flex-row-reverse md:items-center md:gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-background h-8 w-8 border-red-500 text-red-400 hover:border hover:text-red-500"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash className="h-4 w-4" />
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove cart item</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove this item from your cart?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 text-white"
                  onClick={handleDelete}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <QuantityControl
            itemQuantity={itemQuantity}
            setItemQuantity={setItemQuantity}
          />
        </div>
      </div>
      {cartItem.additional_items && cartItem.additional_items.length > 0 && (
        <div className="flex w-full flex-col">
          <p>Add ons</p>
          <div className="flex flex-col">
            {getAddOns(cartItem).map((addOn) => (
              <div
                key={addOn.id}
                className="flex items-center justify-between text-sm"
              >
                <p>{addOn.title}</p>
                <p>${addOn.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartListItem;
