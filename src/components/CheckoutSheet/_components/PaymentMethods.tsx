import React from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface PaymentMethodsProps {
  selectedPaymentMethod: string | null;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<string | null>>;
}

const paymentMethods = [
  {
    type_id: 1,
    title: "Cash on Delivery",
    imgUrl: "/assets/images/Money_Flat_icon.svg",
  },
  {
    type_id: 4,
    title: "HesabPay",
    imgUrl: "/assets/images/hesabpay_logo.png",
  },
];
const PaymentMethods = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: PaymentMethodsProps) => {
  return (
    <div>
      <h3 className="mb-4 font-medium">Payment Details</h3>

      <RadioGroup
        value={selectedPaymentMethod}
        onValueChange={(e: string) => setSelectedPaymentMethod(e)}
        className="flex w-full gap-4"
      >
        {paymentMethods.map((method) => (
          <div
            key={method.type_id}
            className={cn(
              "bg-secondary flex w-full items-center justify-between rounded-2xl border px-4 py-5",
              selectedPaymentMethod === method.type_id.toString() &&
                "border-primary",
            )}
          >
            <Label htmlFor={`option_${method.type_id}`}>{method.title}</Label>
            <RadioGroupItem
              value={method.type_id.toString()}
              id={`option_${method.type_id}`}
            />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethods;
