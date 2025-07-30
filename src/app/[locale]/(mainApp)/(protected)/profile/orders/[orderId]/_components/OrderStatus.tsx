import React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const OrderStates = {
  orderPlaced: {
    label: "Order Placed",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
  },
  orderConfirmed: {
    label: "Order Confirmed",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  },
  preparing: {
    label: "Preparing",
    className:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
  },
  readyToPickUp: {
    label: "Ready to pick up",
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  },
  pickedUp: {
    label: "Picked up",
    className:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300",
  },
  delivered: {
    label: "Delivered",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  },
};

type OrderState = keyof typeof OrderStates;

interface OrderStatusBadgeProps {
  state: OrderState;
}

const OrderStatusBadge = ({ state }: OrderStatusBadgeProps) => {
  const { label, className } = OrderStates[state] || OrderStates["preparing"];

  return <Badge className={cn("", className)}>{label}</Badge>;
};

export default OrderStatusBadge;
