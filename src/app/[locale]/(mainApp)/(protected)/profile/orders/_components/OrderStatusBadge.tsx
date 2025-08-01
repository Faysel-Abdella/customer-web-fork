import React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const OrderStatusMapping: Record<number, { label: string; className: string }> =
  {
    0: {
      label: "Order Placed",
      className:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
    },
    1: {
      label: "Order Placed",
      className:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
    },
    // New stage values
    // Merged "Order Confirmed"
    2: {
      label: "Order Confirmed",
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    },
    // Merged "Ready for Pickup"
    3: {
      label: "Ready for Pickup",
      className:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
    },
    // Merged "Picked Up"
    4: {
      label: "Picked Up",
      className:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
    },
    // Original "Delivered" state with better color
    5: {
      label: "Delivered",
      className:
        "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    },
    // Original "Cancelled" state
    6: {
      label: "Cancelled",
      className:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400",
    },
    // Original "Rejected" state
    7: {
      label: "Rejected",
      className: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
    },
  };

interface OrderStatusBadgeProps {
  stateId: number;
}

const OrderStatusBadge = ({ stateId }: OrderStatusBadgeProps) => {
  const defaultState = {
    label: "Unknown",
    className:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400",
  };

  const { label, className } = OrderStatusMapping[stateId] || defaultState;

  return <Badge className={cn("rounded-full", className)}>{label}</Badge>;
};

export default OrderStatusBadge;
