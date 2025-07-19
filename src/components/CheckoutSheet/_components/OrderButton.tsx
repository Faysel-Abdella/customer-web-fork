import { Loader2 } from "lucide-react";

import FadingDivider from "@/components/FadingDivider";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Offer } from "@/types/restaurant.types";

interface OrderButtonProps {
  selectedPaymentMethod: string | null;
  handlePayment: () => void;
  isOrdering: boolean;
  emptyCart: boolean;
  selectedOffer: Offer | null;
}
const OrderButton = ({
  selectedPaymentMethod,
  handlePayment,
  isOrdering,
  emptyCart,
  selectedOffer,
}: OrderButtonProps) => {
  const { isLoadingTotalPrice, totalPrice } = useCart();

  const discount: number = selectedOffer ? parseInt(selectedOffer.discount) : 0;

  return (
    <div>
      <div className="space-y-3">
        <FadingDivider />
        <div className="flex justify-between">
          <span className="text-muted-foreground">Item total</span>
          <span className="font-semibold text-orange-500">${totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery fees</span>
          <span className="font-semibold text-orange-500">$0</span>
        </div>
        {selectedOffer && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-semibold text-orange-500">
              - ${selectedOffer?.discount}
            </span>
          </div>
        )}
        <FadingDivider />
        <div className="flex justify-between text-lg">
          <span className="font-semibold">Total price</span>
          {isLoadingTotalPrice ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <span className="font-bold text-orange-500">
              ${totalPrice - discount}
            </span>
          )}
        </div>
      </div>
      <Button
        className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
        onClick={handlePayment}
        disabled={selectedPaymentMethod == null || isOrdering || emptyCart}
      >
        Order Now
      </Button>
    </div>
  );
};

export default OrderButton;
