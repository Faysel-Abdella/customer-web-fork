import React from "react";

import { getOrdersList } from "@/actions/profile.actions";

import OrderCard from "./OrderCard";

const OrdersList = async () => {
  const { data, error } = await getOrdersList();
  return (
    <div className="space-y-4">
      {data && data.map((order) => <OrderCard key={order.id} order={order} />)}
    </div>
  );
};

export default OrdersList;
