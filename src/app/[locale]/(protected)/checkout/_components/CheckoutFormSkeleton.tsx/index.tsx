import React from "react";

import { CartItemSkeleton } from "./CartItemSkeleton";
import { InstructionsSkeleton } from "./InstructionsSkeleton";
import { OffersSkeleton } from "./OffersSkeleton";
import { PaymentDetailSkeleton } from "./PaymentDetailSkeleton";
import { SelectAddressSkeleton } from "./SelectAddressSkeleton";

const CheckoutFormSkeleton = () => {
  return (
    <div className="parent-container pb-10">
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="grid gap-5 lg:col-span-2">
          <div className="space-y-4 py-4">
            <CartItemSkeleton />
            <CartItemSkeleton />
          </div>
          <OffersSkeleton />
          <SelectAddressSkeleton />
          <InstructionsSkeleton />
        </div>

        <div className="lg:col-span-1">
          <PaymentDetailSkeleton />
        </div>
      </div>
    </div>
  );
};

export default CheckoutFormSkeleton;
