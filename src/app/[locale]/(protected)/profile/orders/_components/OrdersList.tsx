import { getOrdersList } from "@/actions/profile.actions";
import { DataTable } from "@/components/data-table";

import { orderColumns } from "./columns";

const OrdersList = async () => {
  const { data } = await getOrdersList();

  return <div>{data && <DataTable columns={orderColumns} data={data} />}</div>;
};

export default OrdersList;
