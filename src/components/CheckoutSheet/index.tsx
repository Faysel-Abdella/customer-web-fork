"use client";
import { useState, useTransition } from "react";

import { toast } from "sonner";

import { placeOrder } from "@/actions/actions";
import Instructions from "@/components/CheckoutSheet/_components/Instructions";
import Offers from "@/components/CheckoutSheet/_components/Offers";
import OrderButton from "@/components/CheckoutSheet/_components/OrderButton";
import SelectAddress from "@/components/CheckoutSheet/_components/SelectAddress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CartItem } from "@/types/cart.types";
import { Address } from "@/types/profile.types";
import { Offer, OrderPayload } from "@/types/restaurant.types";

import { Button } from "../ui/button";

import PaymentMethods from "./_components/PaymentMethods";

interface CheckoutSheetProps {
  className?: string;
}
const CheckoutSheet = ({ className }: CheckoutSheetProps) => {
  const {
    cartItems,
    totalPrice,
    currentRestaurantId,
    totalItems,
    refreshCart,
  } = useCart();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  const router = useRouter();
  const [isOrdering, startOrdering] = useTransition();

  const discount: number = selectedOffer ? parseInt(selectedOffer.discount) : 0;

  const getItemArray = () => {
    if (!cartItems || cartItems.length === 0) return [];
    return cartItems.map((item: CartItem) => ({
      item_price: item.selected_rest_price.price,
      price_id: item.price_id,
      product_id: item.id,
      quantity: item.quantity,
      add_on: item.additional_items,
    }));
  };

  const handleOrder = () => {
    if (!selectedAddress) {
      toast.info("Please select an address");
      return;
    }
    if (!cartItems) {
      toast.info("Empty cart");
      return;
    }

    if (!currentRestaurantId) return;

    const orderItems = getItemArray();
    startOrdering(async () => {
      const rawData: { Detail: OrderPayload } = {
        Detail: {
          store_id: currentRestaurantId,
          address: selectedAddress.id.toString(),
          total_price: (totalPrice - discount).toString(),
          payable_amount: totalPrice.toString(),
          type_id: parseInt(selectedPaymentMethod!),
          item: JSON.stringify(orderItems),
        },
      };

      console.log(rawData);
      const results = await placeOrder(JSON.stringify(rawData));

      if (results.error) {
        toast.error("Failed at placing order");
        return;
      }

      if (results.payment_url) {
        window.location.href = results.payment_url;
      } else {
        refreshCart();
        router.push("/profile/orders");
        toast.success("Order placed successfully");
      }
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={cn(className)}>Checkout</Button>
      </SheetTrigger>
      <SheetContent className="h-dvh gap-0 overflow-y-auto rounded-l-2xl max-sm:w-dvw">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">Check out</SheetTitle>
          <SheetDescription className="hidden"></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-5">
          <Instructions
            additionalInstructions={additionalInstructions}
            setAdditionalInstructions={setAdditionalInstructions}
          />
          <SelectAddress
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
          <Offers
            selectedOffer={selectedOffer}
            setSelectedOffer={setSelectedOffer}
          />
          <PaymentMethods
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
        </div>
        <SheetFooter>
          <OrderButton
            selectedOffer={selectedOffer}
            selectedPaymentMethod={selectedPaymentMethod}
            handlePayment={handleOrder}
            isOrdering={isOrdering}
            emptyCart={totalItems == 0}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CheckoutSheet;
