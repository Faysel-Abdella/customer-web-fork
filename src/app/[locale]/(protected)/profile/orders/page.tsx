import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import OrdersList from "./_componets/OrdersList";

const sampleOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: "$89.99",
    items: 3,
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Processing",
    total: "$156.50",
    items: 2,
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "Shipped",
    total: "$45.00",
    items: 1,
  },
];
const OrdersPage = () => {
  return (
    <div className="w-full space-y-6 px-10 py-5">
      <div>
        <h2 className="text-3xl font-bold">Order History</h2>
        <p className="text-muted-foreground mt-2">
          View and track your recent orders.
        </p>
      </div>

      <div className="space-y-4">
        <OrdersList />
      </div>
    </div>
  );
};

export default OrdersPage;
