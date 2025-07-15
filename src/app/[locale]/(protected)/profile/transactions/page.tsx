import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  {
    id: "TXN-001",
    status: "paid" as const,
    amount: 125.5,
    gateway: "hesabpay" as const,
  },
  {
    id: "TXN-002",
    status: "pending" as const,
    amount: 89.99,
    gateway: "cash on delivery" as const,
  },
  {
    id: "TXN-003",
    status: "paid" as const,
    amount: 234.75,
    gateway: "hesabpay" as const,
  },
  {
    id: "TXN-004",
    status: "paid" as const,
    amount: 45.0,
    gateway: "cash on delivery" as const,
  },
  {
    id: "TXN-005",
    status: "pending" as const,
    amount: 167.25,
    gateway: "hesabpay" as const,
  },
  {
    id: "TXN-006",
    status: "paid" as const,
    amount: 78.5,
    gateway: "cash on delivery" as const,
  },
  {
    id: "TXN-007",
    status: "pending" as const,
    amount: 299.99,
    gateway: "hesabpay" as const,
  },
  {
    id: "TXN-008",
    status: "paid" as const,
    amount: 156.75,
    gateway: "hesabpay" as const,
  },
];
const TransactionsPage = () => {
  const getStatusBadge = (status: "paid" | "pending") => {
    if (status === "paid") {
      return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>;
    }
    return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
  };

  const getGatewayBadge = (gateway: "hesabpay" | "cash on delivery") => {
    if (gateway === "hesabpay") {
      return (
        <Badge variant="outline" className="border-blue-500 text-blue-500">
          HesabPay
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="border-orange-500 text-orange-500">
        Cash on Delivery
      </Badge>
    );
  };
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-10">
      <div>
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <p className="text-muted-foreground mt-2">
          View all your payment transactions and their status.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead className="text-muted-foreground">
              Transaction ID
            </TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Amount</TableHead>
            <TableHead className="text-muted-foreground">Gateway</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="hover:bg-zinc-750">
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>{getStatusBadge(transaction.status)}</TableCell>
              <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>{getGatewayBadge(transaction.gateway)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex w-full items-start justify-start">
        <Pagination className="w-fit">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TransactionsPage;
