"use client";
import { useState, useTransition } from "react";

import { toast } from "sonner";

import { placeOrder } from "@/actions/actions";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "@/i18n/navigation";
import { Address } from "@/types/profile.types";
import { Offer } from "@/types/restaurant.types";

import CartItems from "./CartItems";
import CheckoutFormSkeleton from "./CheckoutFormSkeleton.tsx";
import Instructions from "./Instructions";
import Offers from "./Offers";
import PaymentDetail from "./PaymentDetail";
import SelectAddress from "./SelectAddress";

const CheckoutForm = () => {
  const { cartItems, totalPrice, isPending, currentRestaurantId, totalItems } =
    useCart();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  const router = useRouter();
  const [isOrdering, startOrdering] = useTransition();

  const discount: number = selectedOffer ? parseInt(selectedOffer.discount) : 0;

  const handleOrder = () => {
    if (!selectedAddress) {
      toast.info("Please select an address");
      return;
    }
    if (!cartItems) {
      toast.info("Empty cart");
      return;
    }
    startOrdering(async () => {
      const rawData = {
        Detail: {
          store_id: currentRestaurantId,
          address: selectedAddress.id.toString(),
          total_price: (totalPrice - discount).toString(),
          payable_amount: totalPrice.toString(),
          type_id: parseInt(selectedPaymentMethod!),
          payment_status: 1,
          item: JSON.stringify(cartItems),
        },
      };

      const results = await placeOrder(JSON.stringify(rawData));

      if (results.error) {
        toast.error("Failed at placing order");
        return;
      }

      if (results.payment_url) {
        window.location.href = results.payment_url;
      } else {
        router.push("/profile/orders");
        toast.success("Order placed successfully");
      }
    });
  };

  if (isPending) return <CheckoutFormSkeleton />;
  return (
    <div className="parent-container pb-10">
      {cartItems && (
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="grid gap-5 lg:col-span-2">
            <div className="space-y-4 py-4">
              {cartItems.map((item) => (
                <CartItems key={item.id} cartItem={item} />
              ))}
            </div>
            <Offers
              selectedOffer={selectedOffer}
              setSelectedOffer={setSelectedOffer}
            />
            <SelectAddress
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <Instructions
              additionalInstructions={additionalInstructions}
              setAdditionalInstructions={setAdditionalInstructions}
            />
          </div>
          <div className="lg:col-span-1">
            <PaymentDetail
              selectedOffer={selectedOffer}
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              handlePayment={handleOrder}
              isOrdering={isOrdering}
              emptyCart={totalItems == 0}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
