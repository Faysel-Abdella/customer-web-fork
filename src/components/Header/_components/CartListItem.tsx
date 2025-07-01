import { useEffect, useState, useTransition } from "react";
import Image from "next/image";

import { Loader2, Minus, Plus, Trash } from "lucide-react";
import { toast } from "sonner";

import { deleteCartItem, updateCartItem } from "@/actions/cart.actions";
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
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import useDebounce from "@/hooks/useDebounce";
import { CartItem } from "@/types/restaurant.types";

interface CartListItemProps {
  cartItem: CartItem;
}
const CartListItem = ({ cartItem }: CartListItemProps) => {
  const [itemQuantity, setItemQuantity] = useState(cartItem.quantity);

  const [isUpdating, startUpdateTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  const { refreshCart, silentRefreshCart } = useCart();

  const debouncedQuantity = useDebounce(itemQuantity, 500);

  useEffect(() => {
    if (debouncedQuantity !== cartItem.quantity) {
      startUpdateTransition(async () => {
        const result = await updateCartItem(
          cartItem.id.toString(),
          debouncedQuantity.toString(),
        );
        if (result.success) silentRefreshCart();
        if (result.error) {
          toast.error("Error", { description: result.error });
        }
      });
    }
  }, [debouncedQuantity, cartItem.id, cartItem.quantity, silentRefreshCart]);

  const handleDelete = async () => {
    startDeleteTransition(async () => {
      const result = await deleteCartItem(cartItem.id.toString());
      if (result.error) {
        toast.error("Error", { description: result.error });
      }
      if (result.success) refreshCart();
    });
  };
  console.log(cartItem.additional_items);

  return (
    <div key={cartItem.id} className="flex items-center gap-4 border-b pb-3">
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
          {isUpdating ? (
            <Loader2 className="text-muted-foreground h-5 w-6 animate-spin" />
          ) : (
            <p className="text-muted-foreground text-sm max-md:text-xs">
              ${cartItem.total_price}(
              {cartItem.additional_items.map(
                (item) => " +" + " $" + item.price,
              )}
              )
            </p>
          )}
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

        <div className="flex w-full items-center justify-start gap-2">
          <Button
            variant={"outline"}
            onClick={() =>
              setItemQuantity((prev) => (prev > 0 ? prev - 1 : prev))
            }
            className="h-8 w-8"
          >
            <Minus />
          </Button>
          <Input
            className="w-14"
            type="number"
            min={1}
            max={10}
            value={itemQuantity}
            onChange={(e) => setItemQuantity(parseInt(e.target.value))}
          />
          <Button
            variant={"outline"}
            onClick={() =>
              setItemQuantity((prev) => (prev < 10 ? prev + 1 : prev))
            }
            className="h-8 w-8"
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartListItem;
