import Image from "next/image";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/types/profile.types";

interface OrderCardProps {
  order: Order;
}
const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Card className="py-2">
      <CardContent className="flex justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="relative size-28">
            <Image
              src={order.storeDetail.image_file}
              alt={`${order.store_title} image`}
              fill
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-bold">{order.store_title}</p>
            <div className="flex items-center gap-2">
              <p className="font-semibold">Order Id : </p>{" "}
              <p className="text-muted-foreground">{order.order_no}</p>
            </div>
            <p className="text-muted-foreground flex gap-2">
              <span className="text-foreground font-semibold">Placed on :</span>
              {format(new Date(order.created_on), "dd MMM yy 'at' HH:mm")}
            </p>
            <div className="flex items-center gap-2">
              <p className="font-semibold">Delivered to : </p>
              <p className="text-muted-foreground">
                {order.customer_address_deatil.title}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="text-primary text-lg font-bold">
            ${order.total_price}
          </div>
          <Button>View details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
