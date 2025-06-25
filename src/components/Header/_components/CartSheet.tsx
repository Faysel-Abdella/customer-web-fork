// src/components/layout/cart-sheet.tsx

import { useMemo } from "react";
import Link from "next/link";

import { Minus, Plus, ShoppingCart, X } from "lucide-react";

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

type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

const cartItems: CartItem[] = [
  {
    id: "1",
    name: "Spicy Kitfo",
    image: "/images/kitfo.jpg",
    price: 15.0,
    quantity: 1,
  },
  {
    id: "2",
    name: "Doro Wot Platter",
    image: "/images/doro-wot.jpg",
    price: 22.5,
    quantity: 2,
  },
];

export function CartSheet() {
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, []);

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
          {itemCount > 0 && (
            <span className="bg-primary text-primary-foreground absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full text-xs">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>

        <Separator />

        {itemCount > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <div className="space-y-4 py-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-3"
                  >
                    <div className="bg-secondary h-16 w-16 animate-pulse rounded-md"></div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground text-sm">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Separator />
            <SheetFooter className="pt-0">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <Link href="/checkout" passHref>
                  <Button size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
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
