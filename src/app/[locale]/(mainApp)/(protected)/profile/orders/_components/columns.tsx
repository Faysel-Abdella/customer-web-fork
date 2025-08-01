"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoveUpRight } from "lucide-react";

import CustomLink from "@/components/CustomLink";
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
        <CustomLink
          href={`/profile/orders/${row.original.id}`}
          className="text-secondary-foreground flex items-center underline"
        >
          View Details <MoveUpRight size={12} />
        </CustomLink>
      );
    },
  },
];
