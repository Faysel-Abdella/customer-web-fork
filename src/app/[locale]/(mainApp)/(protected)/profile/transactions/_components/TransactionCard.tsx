"use client";

import { format } from "date-fns";
import { Calendar, Coins, CreditCard, Gift, Store } from "lucide-react";

import FormattedAfghani from "@/components/FormattedAfghani";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from "@/types/profile.types";

interface TransactionCardProps {
  transaction: Transaction;
}

const getStatusBadge = (status: string) => {
  const statusLower = status.toLowerCase();

  if (statusLower === "paid") {
    return (
      <Badge className="border-emerald-500/20 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
        Completed
      </Badge>
    );
  }
  if (statusLower === "pending" || statusLower === "processing") {
    return (
      <Badge className="border-amber-500/20 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
        Pending
      </Badge>
    );
  }
  if (statusLower === "failed" || statusLower === "cancelled") {
    return (
      <Badge className="border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20">
        Failed
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-muted-foreground border-zinc-600">
      {status}
    </Badge>
  );
};

const getGatewayIcon = (gateway: string) => {
  switch (gateway.toLowerCase()) {
    case "hesabpay":
      return <CreditCard className="h-4 w-4 text-blue-400" />;
    case "cash_on_delivery":
      return <Coins className="h-4 w-4 text-green-400" />;
    default:
      return <CreditCard className="text-muted-foreground h-4 w-4" />;
  }
};

const getGatewayLabel = (gateway: string) => {
  switch (gateway.toLowerCase()) {
    case "hesabpay":
      return "HesabPay";
    case "cash_on_delivery":
      return "Cash on Delivery";

    default:
      return gateway;
  }
};

export function TransactionCard({ transaction }: TransactionCardProps) {
  const hasDiscounts =
    Number.parseFloat(transaction.discount_amount) > 0 ||
    transaction.referral_points_used > 0;

  return (
    <Card className="border py-0 shadow-none">
      <CardContent className="p-3 md:p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex w-2/3 items-center gap-3 overflow-hidden md:w-1/2">
            <div className="bg-secondary rounded-lg border p-2">
              {getGatewayIcon(transaction.gateway)}
            </div>
            <div className="w-full max-w-full">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-medium">#{transaction.id}</span>
                {getStatusBadge(transaction.status)}
              </div>
              <div className="text-muted-foreground flex w-full items-center gap-1 text-sm">
                <Store className="h-3 w-3" />
                <span className="line-clamp-1 truncate">
                  {transaction.restaurant_name || "Unknown Restaurant"}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="mb-1 text-lg font-bold md:text-2xl">
              <FormattedAfghani amount={parseFloat(transaction.amount)} />
            </div>
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <Calendar className="h-3 w-3" />
              <span>
                {transaction.created_at &&
                  format(
                    new Date(transaction.created_at),
                    "MMM dd',' yyyy hh:mm aa",
                  )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Order:</span>
              <span className="text-muted-foreground font-mono">
                #{transaction.order_id}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Via:</span>
              <span className="text-muted-foreground">
                {getGatewayLabel(transaction.gateway)}
              </span>
            </div>
          </div>

          {hasDiscounts && (
            <div className="flex items-center gap-3 text-sm">
              {Number.parseFloat(transaction.discount_amount) > 0 && (
                <div className="flex items-center gap-1 text-green-400">
                  <Gift className="h-3 w-3" />
                  <span>
                    -{" "}
                    <FormattedAfghani
                      amount={parseFloat(transaction.discount_amount)}
                    />
                  </span>
                </div>
              )}
              {transaction.referral_points_used > 0 && (
                <div className="flex items-center gap-1 text-purple-400">
                  <Coins className="h-3 w-3" />
                  <span>{transaction.referral_points_used} pts</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
