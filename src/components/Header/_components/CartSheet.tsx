"use client";
import Link from "next/link";

import { Loader, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";

import CartListItem from "./CartListItem";

export function CartSheet() {
  const { cartItems, isPending, totalItems } = useCart();

  const calculateTotal = () => {
    if (cartItems && cartItems.length > 0) {
      let totalPrice = 0;
      cartItems.forEach((item) => (totalPrice = totalPrice + item.total_price));
      return totalPrice;
    }
    return 0;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className={
            "text-foreground hover:bg-secondary hover:text-secondary-foreground relative flex size-10 cursor-pointer items-center justify-center transition-all hover:rounded-lg"
          }
        >
          <ShoppingCart size={18} />
          {totalItems > 0 && (
            <span className="bg-primary text-primary-foreground absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full text-xs">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>

        <Separator />

        {isPending ? (
          <div className="flex h-96 w-full items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : totalItems > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto px-2 md:px-6">
              <div className="space-y-4 py-4">
                {cartItems &&
                  cartItems.map((item) => (
                    <CartListItem key={item.id} cartItem={item} />
                  ))}
              </div>
            </div>

            <Separator />
            <SheetFooter className="pt-0">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between font-semibold">
                  <span>Subtotal</span>
                  <span className="text-primary text-xl">
                    ${calculateTotal()}
                  </span>
                </div>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <ShoppingCart className="text-muted-foreground h-16 w-16" />
            <p className="mt-4 text-lg font-semibold">Your cart is empty</p>
            <p className="text-muted-foreground text-sm">
              Add some delicious food to get started!
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
