"use client";
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
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "@/i18n/navigation";
import { CartItem } from "@/types/restaurant.types";

interface CartItemsProps {
  cartItem: CartItem;
}
const CartItems = ({ cartItem }: CartItemsProps) => {
  const [itemQuantity, setItemQuantity] = useState(cartItem.quantity);

  const [isUpdating, startUpdateTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  const { refreshCart, silentRefreshCart } = useCart();
  const router = useRouter();

  const debouncedQuantity = useDebounce(itemQuantity, 500);

  useEffect(() => {
    if (debouncedQuantity !== cartItem.quantity) {
      startUpdateTransition(async () => {
        const result = await updateCartItem(
          cartItem.id.toString(),
          debouncedQuantity.toString(),
        );
        if (result.success) {
          silentRefreshCart();
          router.refresh();
        }
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

  return (
    <Card className="py-0">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              fill
              src={cartItem.restaurant_items[0].image_file}
              alt={`${cartItem.restaurant_items[0].title}`}
            />
          </div>
          <div className="flex-1">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {" "}
                  {cartItem.restaurant_items[0].title}
                </h3>
                {isUpdating ? (
                  <Loader2 className="text-muted-foreground h-5 w-6 animate-spin" />
                ) : (
                  <p className="text-lg font-bold text-orange-500">
                    ${cartItem.total_price}
                  </p>
                )}
              </div>

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
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
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
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Add ons</span>
            <span className="font-semibold">
              {cartItem.additional_items.map(
                (item) => " ," + " $" + item.price,
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItems;
