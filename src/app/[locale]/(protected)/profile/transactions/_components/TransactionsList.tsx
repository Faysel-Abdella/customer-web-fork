"use client";
import { useCallback, useEffect, useState } from "react";

import { getTransactionsList } from "@/actions/profile.actions";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAuth } from "@/contexts/AuthContext";
import { Transaction } from "@/types/profile.types";

import { TransactionCard } from "./TransactionCard";
import TransactionCardSkeleton from "./TransactionCardSkeleton";

const TransactionsList = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    if (!user) return;
    const { data, success, error } = await getTransactionsList(
      user?.id.toString(),
    );
    if (success && data) {
      setTransactions(data);
    } else if (error) {
      setError(error);
    }

    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    fetchTransactions();
  }, [user, fetchTransactions]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <TransactionCardSkeleton />
        <TransactionCardSkeleton />
        <TransactionCardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border shadow-none">
        <CardContent className="flex h-28 items-center justify-center">
          <div className="text-muted-foreground text-lg">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (transactions)
    return (
      <div className="space-y-4">
        {transactions.length > 0 ? (
          <div>
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
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
        ) : (
          <Card className="border shadow-none">
            <CardContent className="flex h-28 items-center justify-center">
              <div className="text-muted-foreground text-lg">
                No transactions found
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
};

export default TransactionsList;
