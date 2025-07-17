"use client";

import { useCallback, useEffect, useState } from "react";

import { MapPin } from "lucide-react";
import { toast } from "sonner";

import { getOrderStatus } from "@/actions/profile.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import OrderMap from "./OrderMap";

const orderStates: {
  stage: number;
  label: string;
  color: string;
  bgColor: string;
  status: string;
}[] = [
  {
    stage: 1,
    label: "Order Placed",
    color: "text-orange-500",
    bgColor: "bg-orange-500",
    status: "PENDING",
  },
  {
    stage: 2,
    label: "Order Confirmed",
    color: "text-green-500",
    bgColor: "bg-green-500",
    status: "ASSIGNED",
  },
  {
    stage: 3,
    label: "Ready for Pickup",
    color: "text-red-500",
    bgColor: "bg-gray-400",
    status: "WAITING",
  },
  {
    stage: 4,
    label: "Picked Up",
    color: "text-blue-500",
    bgColor: "bg-gray-400",
    status: "PICKED_UP",
  },
  {
    stage: 5,
    label: "Delivered",
    color: "text-orange-500",
    bgColor: "bg-gray-400",
    status: "DELIVERED",
  },
];

interface TrackOrderProps {
  order_id: string;
}
export function TrackOrder({ order_id }: TrackOrderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState<number>(1);

  const skeletonItems = Array(5).fill(0);

  const [isLoading, setIsLoading] = useState(false);

  const fetchOrderStatus = useCallback(async () => {
    setIsLoading(true);
    const { status, success } = await getOrderStatus(order_id);
    if (!success) {
      toast.error("Failed to get order status");
      setIsOpen(false);
    }
    if (status) {
      const currentStatus = orderStates.find((item) => item.status == status);
      if (currentStatus) setCurrentStage(currentStatus.stage);
    }

    setIsLoading(false);
  }, [order_id]);

  useEffect(() => {
    fetchOrderStatus();
  }, [fetchOrderStatus]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <MapPin className="mr-2 h-4 w-4" />
          Track Order
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-dvh max-w-md flex-col items-center overflow-hidden overflow-y-auto p-6">
        <DialogTitle />
        <DialogDescription />
        <OrderMap />
        <div className="flex w-full flex-col">
          <h2 className="mb-4 text-xl font-semibold">Trip</h2>
          <div className="flex w-full items-center justify-center">
            <div className="flex w-fit flex-col">
              {isLoading
                ? skeletonItems.map((_, index) => (
                    <div
                      key={index}
                      className="flex animate-pulse items-start gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className="h-3 w-3 rounded-full bg-gray-200 dark:bg-gray-700" />
                        {index < skeletonItems.length - 1 && (
                          <div className="h-8 w-0.5 bg-gray-200 dark:bg-gray-700" />
                        )}
                      </div>
                      <div className="-mt-1.5 h-5 w-28 rounded-md bg-gray-200 dark:bg-gray-700" />
                    </div>
                  ))
                : orderStates.map((item, index) => (
                    <div key={item.stage} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            item.stage <= currentStage
                              ? item.bgColor
                              : "bg-secondary border"
                          } ${item.stage == currentStage ? "ring-2 ring-orange-300 dark:ring-orange-500/50" : ""}`}
                        />
                        {index < orderStates.length - 1 && (
                          <div className="h-8 w-0.5 bg-gray-200" />
                        )}
                      </div>
                      <div className="-mt-1.5">
                        <span className="text-sm text-gray-500">Status: </span>
                        <span
                          className={
                            item.stage <= currentStage
                              ? item.color
                              : "text-muted-foreground"
                          }
                        >
                          {item.label}
                        </span>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
