"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/profile.types";

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "store_title",
    header: "Restaurant",
    cell: ({ row }) => {
      const store = row.original.store_title;
      return <span className="font-medium">{store}</span>;
    },
  },
  {
    accessorKey: "order_no",
    header: "Order No",
    cell: ({ row }) => {
      const orderNo = row.original.order_no;
      return (
        <Badge variant={"secondary"} className="text-secondary-foreground">
          #{orderNo}
        </Badge>
      );
    },
  },
  {
    accessorKey: "orderState",
    header: "Status",
    cell: ({ row }) => {
      const orderState = row.original.orderState;
      console.log("Order State:", orderState);
      return (
        <Badge variant="outline" className="text-muted-foreground">
          {orderState ? orderState[0].description : "Pending"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_on",
    header: "Placed on",
  },
  {
    accessorKey: "total_price",
    header: "Amount",
  },
  {
    header: "Detail",
  },
];
