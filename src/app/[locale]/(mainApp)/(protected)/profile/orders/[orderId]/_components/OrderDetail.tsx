import { ChevronRight, Layers2 } from "lucide-react";

import { getOrderDetail } from "@/actions/profile.actions";
import CustomImage from "@/components/CustomImage";
import CustomLink from "@/components/CustomLink";
import FadingDivider from "@/components/FadingDivider";
import { Button } from "@/components/ui/button";

import OrderedItems from "./OrderedItems";
import PaymentStatusBadge from "./PaymentStatusBadge";
import { TrackOrder } from "./TrackOrder";

interface OrderDetailProps {
  orderId: string;
}

const restaurant_placeholder = "/assets/images/restaurant_placeholder.webp";

const OrderDetail = async ({ orderId }: OrderDetailProps) => {
  const { data: order } = await getOrderDetail(orderId);

  if (!order) return;

  return (
    <div className="flex max-w-2xl flex-col gap-7">
      <FadingDivider />

      <div className="bg-card flex items-center rounded-2xl border px-4 py-3">
        <div className="flex h-full flex-col justify-between">
          <p className="text-muted-foreground text-sm">Order No.</p>
          <p className="text-lg font-medium">#{order.order_no}</p>
        </div>
      </div>
      <div>
        <p className="mb-4 font-medium">Delivery Address</p>
        <div className="bg-card flex w-full items-center gap-5 rounded-2xl border px-4 py-3">
          <Layers2 className="text-primary" />
          <div>
            <p className="text-lg font-medium">
              {order.customer_address_deatil.title}
            </p>
            <p className="text-muted-foreground text-sm">
              {order.customer_address_deatil.address}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-7">
        <CustomLink href={`/restaurants/${order.store_id}`}>
          <div className="group flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative size-14 overflow-hidden rounded-full">
                <CustomImage
                  imgUrl={order.storeDetail.image_file}
                  title={order.store_title}
                  placeholderImage={restaurant_placeholder}
                  className="object-cover"
                />
              </div>
              <div className="flex h-full flex-col justify-between gap-2">
                <p className="text-lg font-medium">{order.storeDetail.title}</p>
                <p className="text-muted-foreground text-sm">
                  {order.storeDetail.location}
                </p>
              </div>
            </div>
            <ChevronRight className="transition-all group-hover:translate-x-4" />
          </div>
        </CustomLink>
        <FadingDivider />
        <TrackOrder
          order_id={order.id.toString()}
          restaurant={order.storeDetail}
        />
      </div>
      <OrderedItems items={order.item_detail} />

      <div>
        <p className="mb-4 font-medium">Payment</p>
        <div className="bg-card flex w-full items-center justify-between gap-5 rounded-2xl border px-4 py-3">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">Payment Method</p>
            <p className="text-lg font-medium">
              {order.payment_type == 1 && "Cash on Delivery"}
              {order.payment_type == 4 && "HesabPay"}
            </p>
          </div>
          {(order.payment_status === 1 || order.payment_status == 0) && (
            <PaymentStatusBadge status={order.payment_status} />
          )}
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <FadingDivider />
        <div className="flex justify-between">
          <span className="text-secondary-foreground">Item Total</span>
          <span className="font-medium">${order.total_price}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-secondary-foreground">Delivery Charges</span>
          <span className="font-medium">${order.delivery_charge}</span>
        </div>
        <FadingDivider />
        <div className="flex justify-between text-lg font-bold">
          <span className="">Total</span>
          <span className="">${order.payable_amount}</span>
        </div>
      </div>

      <div className="pb-6">
        <Button className="bg-primary w-full py-3 text-lg font-semibold text-white hover:bg-orange-600">
          Cancel Order
        </Button>
      </div>
    </div>
  );
};

export default OrderDetail;
