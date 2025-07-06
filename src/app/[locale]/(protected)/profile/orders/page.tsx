import { Metadata } from "next";

import OrdersList from "./_componets/OrdersList";

export const metadata: Metadata = {
  title: "Your Orders | Time delivery",
  description:
    "View your past and current orders. Track the status of your delivery and reorder your favorite meals with ease.",
};

const OrdersPage = () => {
  return (
    <div className="w-full space-y-6 px-0 py-5 md:px-10">
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
