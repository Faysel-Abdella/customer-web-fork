import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
        {sampleOrders.map((order) => (
          <Card key={order.id}>
            <CardContent>
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div className="space-y-2">
                  <p className="text-lg font-semibold">{order.id}</p>
                  <p className="text-muted-foreground text-sm">
                    Placed on {order.date}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {order.items} items
                  </p>
                </div>
                <div className="space-y-2 text-left sm:text-right">
                  <p className="text-lg font-semibold">{order.total}</p>
                  <Badge
                    variant={
                      order.status === "Delivered"
                        ? "default"
                        : order.status === "Processing"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
              <div className="mt-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {order.status === "Delivered" && (
                  <Button variant="outline" size="sm">
                    Reorder
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
