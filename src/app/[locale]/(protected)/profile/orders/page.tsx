import OrdersList from "./_componets/OrdersList";

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
