import Image from "next/image";

import { getOrderDetail } from "@/actions/profile.actions";

import ReviewModal from "./ReviewModal";
import { TrackOrder } from "./TrackOrder";

interface OrderDetailProps {
  orderId: string;
}

const addressTypes = [
  {
    icon: "🏠",
    title: "Home",
    value: "1",
  },
  {
    icon: "🏢",
    title: "Office",
    value: "2",
  },
  {
    icon: "🏨",
    title: "Hotel",
    value: "3",
  },
  {
    title: "Other",
    value: "4",
  },
];

const getAddressType = (value: string) => {
  if (!value) return null;
  return addressTypes.find((item) => item.value == value);
};

const OrderDetail = async ({ orderId }: OrderDetailProps) => {
  const { data: order } = await getOrderDetail(orderId);

  if (!order) return;

  const addresType = order.customer_address_deatil.type_id
    ? getAddressType(order.customer_address_deatil.type_id.toString())
    : addressTypes[3];

  return (
    <div className="flex max-w-3xl flex-col">
      <div className="py-5">
        <div className="flex items-center justify-between">
          <span className="font-medium">Estimated Arrival</span>
          <span className="text-primary font-medium">Order Placed</span>
        </div>
      </div>

      <div className="bg-secondary mb-6 rounded-lg px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="mb-4 font-medium">
              Order is being prepared and delivered by {order.store_title}
            </p>
            <TrackOrder order_id={order.id.toString()} />
          </div>
        </div>
      </div>

      <div className="py-4">
        <h3 className="mb-4 font-semibold">Delivering to</h3>
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
            {addresType?.icon}
          </div>
          <span className="text-xl font-bold">{addresType?.title}</span>
        </div>
        <p className="text-muted-foreground ml-13">
          {order.customer_address_deatil.title}
        </p>
      </div>

      <div className="bg-secondary mb-6 rounded-lg border px-4 py-4">
        <p className="text-muted-foreground mb-2 text-sm">Your Ordered From</p>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{order.store_title}</h3>
          <div className="relative size-24 rounded-lg">
            <Image
              src={order.store_image}
              alt="Haile restaurant"
              fill
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="py-4">
        <h3 className="mb-6 text-xl font-bold">Payment Details</h3>

        <div className="mb-6 space-y-4">
          <div className="flex justify-between">
            <span className="">Item Total</span>
            <span className="font-medium">${order.total_price}</span>
          </div>

          <div className="flex justify-between">
            <span className="">Delivery fees</span>
            <span className="text-primary font-medium">Free</span>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <span className="">Total</span>
            <span className="">${order.total_price}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="">Payment Method</span>
            <span className="font-medium">
              {order.payment_type == 1 && "Cash on Delivery"}
              {order.payment_type == 4 && "HesabPay"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="">Status</span>
            <span className="font-medium text-green-500">Paid</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 py-4">
        <h3 className="text-muted-foreground text-xl font-bold">Support</h3>
        <p className="text-muted-foreground">Order ID: {order.order_no}</p>
      </div>

      <div className="pb-6">
        <ReviewModal
          order={order}
          className="bg-primary w-full rounded-full py-3 text-lg font-semibold text-white hover:bg-orange-600"
        />

        {/* <Button className="bg-primary w-full rounded-full py-3 text-lg font-semibold text-white hover:bg-orange-600">
          Cancel Order
        </Button> */}
      </div>
    </div>
  );
};

export default OrderDetail;
