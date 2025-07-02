"use client";
import { useState, useTransition } from "react";

import { toast } from "sonner";

import { placeOrder } from "@/actions/actions";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "@/i18n/navigation";
import { objectToFormData } from "@/lib/utils";
import { Address } from "@/types/profile.types";

import CartItems from "./CartItems";
import CheckoutFormSkeleton from "./CheckoutFormSkeleton.tsx";
import Instructions from "./Instructions";
import Offers from "./Offers";
import PaymentDetail from "./PaymentDetail";
import SelectAddress from "./SelectAddress";

const CheckoutForm = () => {
  const { cartItems, totalPrice, isPending } = useCart();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  const router = useRouter();
  const [isOrdering, startOrdering] = useTransition();

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
      const data = objectToFormData({
        "Detail[store_id]": cartItems[0].store_id,
        "Detail[address]": selectedAddress.id,
        "Detail[total_price]": totalPrice,
        "Detail[payable_amount]": totalPrice,
        "Detail[type_id]": selectedPaymentMethod,
        payment_status: 1,
        "Detail[item]": JSON.stringify(cartItems),
      });

      const results = await placeOrder(data);

      if (results.error) {
        toast.error("Failed at placing order");
      }

      if (results.hesabPayLink) {
        console.log(results.hesabPayLink);
      }
      if (results.success) {
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
            <Offers />
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
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              handlePayment={handleOrder}
              isOrdering={isOrdering}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
