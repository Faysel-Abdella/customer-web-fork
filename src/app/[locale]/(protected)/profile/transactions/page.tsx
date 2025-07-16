import TransactionsList from "./_components/TransactionsList";

const TransactionsPage = () => {
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-10">
      <div>
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <p className="text-muted-foreground mt-2">
          View all your payment transactions and their status.
        </p>
      </div>
      <TransactionsList />
    </div>
  );
};

export default TransactionsPage;
