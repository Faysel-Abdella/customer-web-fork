// src/components/layout/cart-sheet.tsx

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
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

// Define the type for a cart item for type safety
type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

// Mock data - in a real app, this would come from a state manager (like Zustand or Redux)
const cartItems: CartItem[] = [
  {
    id: "1",
    name: "Spicy Kitfo",
    image: "/images/kitfo.jpg", // Replace with your actual image path
    price: 15.0,
    quantity: 1,
  },
  {
    id: "2",
    name: "Doro Wot Platter",
    image: "/images/doro-wot.jpg", // Replace with your actual image path
    price: 22.5,
    quantity: 2,
  },
];

export function CartSheet() {
  // In a real app, you would have functions to handle these actions
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className=' relative size-10 rounded-lg border cursor-pointer hover:bg-secondary flex transition-colors justify-center items-center '
        >
          <ShoppingCart size={18} />
          {itemCount > 0 && (
            <span className='absolute top-0 right-0 h-4 w-4 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center'>
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>

        <Separator />

        {itemCount > 0 ? (
          <>
            {/* Cart Items List */}
            <div className='flex-1 overflow-y-auto  px-6 '>
              <div className='space-y-4 py-4'>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center gap-4 border-b pb-3'
                  >
                    <div className=' h-16 w-16 bg-secondary animate-pulse rounded-md'></div>
                    <div className='flex-1'>
                      <p className='font-medium'>{item.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button variant='outline' size='icon' className='h-8 w-8'>
                        <Minus className='h-4 w-4' />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button variant='outline' size='icon' className='h-8 w-8'>
                        <Plus className='h-4 w-4' />
                      </Button>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-muted-foreground'
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Subtotal and Checkout Button */}
            <Separator />
            <SheetFooter className=' pt-0'>
              <div className='w-full space-y-4'>
                <div className='flex justify-between items-center font-semibold'>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <Link href='/checkout' passHref>
                  <Button size='lg' className='w-full'>
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        ) : (
          // Empty Cart State
          <div className='flex flex-col items-center justify-center h-full text-center'>
            <ShoppingCart className='h-16 w-16 text-muted-foreground' />
            <p className='mt-4 text-lg font-semibold'>Your cart is empty</p>
            <p className='text-sm text-muted-foreground'>
              Add some delicious food to get started!
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
