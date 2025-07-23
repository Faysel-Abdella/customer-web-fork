"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoveUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
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
      return (
        <Badge variant="outline">
          {orderState[0]
            ? orderState[0].state_id == 1
              ? "Active"
              : "InActive"
            : "Unavailable"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_on",
    header: "Placed on",
    cell: ({ row }) => {
      return (
        <span>
          {format(new Date(row.original.created_on), "dd MMM yy 'at' hh:mm aa")}
        </span>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium">${row.original.total_price}</span>
    ),
  },
  {
    header: "Detail",
    cell: ({ row }) => {
      return (
        <Link
          href={`/profile/orders/${row.original.id}`}
          className="text-secondary-foreground flex items-center underline"
        >
          View Details <MoveUpRight size={12} />
        </Link>
      );
    },
  },
];
