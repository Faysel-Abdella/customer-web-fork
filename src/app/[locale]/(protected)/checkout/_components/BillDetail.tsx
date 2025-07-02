import React from "react";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";

const BillDetail = () => {
  const { isLoadingTotalPrice, totalPrice } = useCart();

  return (
    <div className="sticky top-28 mt-4">
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
          <Button className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600">
            Order Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillDetail;
