"use client";
import React, { useState } from "react";

import { useCart } from "@/contexts/CartContext";
import { Address } from "@/types/profile.types";

import BillDetail from "./BillDetail";
import CartItems from "./CartItems";
import Instructions from "./Instructions";
import Offers from "./Offers";
import SelectAddress from "./SelectAddress";

const CheckoutForm = () => {
  const { cartItems } = useCart();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [additionalInstructions, setAdditionalInstructions] = useState("");

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
            <BillDetail />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
