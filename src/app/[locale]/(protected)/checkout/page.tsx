import React from "react";

import { ChevronRight } from "lucide-react";

import { getCartItems } from "@/actions/cart.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import TitleBanner from "../../(marketing)/_components/TitleBanner";

import BillDetail from "./_components/BillDetail";
import CartItems from "./_components/CartItems";
import Instructions from "./_components/Instructions";
import Offers from "./_components/Offers";
import SelectAddress from "./_components/SelectAddress";

const CheckoutPage = async () => {
  const { data, error } = await getCartItems();
  return (
    <div>
      <TitleBanner title={"Checkout"} />
      <div className="parent-container pb-10">
        {data && (
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="grid gap-5 lg:col-span-2">
              <div className="space-y-4 py-4">
                {data.map((item) => (
                  <CartItems key={item.id} cartItem={item} />
                ))}
              </div>
              <Offers />
              <SelectAddress />
              <Instructions />
            </div>
            <div className="lg:col-span-1">
              <BillDetail />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
