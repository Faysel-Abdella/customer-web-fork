import React from "react";
import Image from "next/image";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

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

interface PaymentDetailProps {
  selectedPaymentMethod: string | null;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<string | null>>;
  handlePayment: () => void;
  isOrdering: boolean;
}
const PaymentDetail = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  handlePayment,
  isOrdering,
}: PaymentDetailProps) => {
  const { isLoadingTotalPrice, totalPrice } = useCart();

  return (
    <div className="sticky top-28 mt-4 space-y-10">
      <Card className="py-0">
        <CardContent className="p-4">
          <h3 className="mb-4 text-lg font-semibold">Bill Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Item total</span>
              <span className="font-semibold text-orange-500">
                ${totalPrice}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery fees</span>
              <span className="font-semibold text-orange-500">$10</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Total price</span>
              {isLoadingTotalPrice ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <span className="font-bold text-orange-500">
                  ${totalPrice + 10}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="py-0">
        <CardContent className="p-4">
          <h3 className="mb-4 text-lg font-semibold">Payment Details</h3>

          <div>
            <RadioGroup
              value={selectedPaymentMethod}
              onValueChange={(e: string) => setSelectedPaymentMethod(e)}
            >
              {paymentMethods.map((method) => (
                <div
                  key={method.type_id}
                  className={cn(
                    "bg-secondary flex items-center justify-between rounded-lg border p-2",
                    selectedPaymentMethod === method.type_id.toString() &&
                      "border-primary",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value={method.type_id.toString()}
                      id={`option_${method.type_id}`}
                    />
                    <Label htmlFor={`option_${method.type_id}`}>
                      {method.title}
                    </Label>
                  </div>
                  <div className="relative size-10">
                    <Image
                      src={method.imgUrl}
                      fill
                      alt={method.title}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Button
            className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
            onClick={handlePayment}
            disabled={selectedPaymentMethod == null || isOrdering}
          >
            Order Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentDetail;
