import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const PaymentStates = {
  1: {
    label: "Paid",
    color: "green",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border border-green-500",
  },
  0: {
    label: "Not Paid",
    color: "red",
    className:
      "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border border-green-500",
  },
};

interface PaymentStatusBadgeProps {
  status: 1 | 0;
}

const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  const { label, className, color } = PaymentStates[status];

  return (
    <Badge className={cn("h-8 sm:w-20", className)}>
      <div className={cn("size-1.5 rounded-full", `bg-${color}-500`)} />
      {label}
    </Badge>
  );
};

export default PaymentStatusBadge;
