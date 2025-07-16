"use client";

import { useState } from "react";

import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const orderStatuses = [
  {
    status: "Order Placed",
    color: "text-orange-500",
    bgColor: "bg-orange-500",
    completed: true,
    active: true,
  },
  {
    status: "Order Confirmed",
    color: "text-green-500",
    bgColor: "bg-green-500",
    completed: true,
    active: false,
  },
  {
    status: "Preparing",
    color: "text-yellow-500",
    bgColor: "bg-gray-400",
    completed: false,
    active: false,
  },
  {
    status: "Ready to pick up",
    color: "text-red-500",
    bgColor: "bg-gray-400",
    completed: false,
    active: false,
  },
  {
    status: "Picked up",
    color: "text-blue-500",
    bgColor: "bg-gray-400",
    completed: false,
    active: false,
  },
  {
    status: "Delivered",
    color: "text-orange-500",
    bgColor: "bg-gray-400",
    completed: false,
    active: false,
  },
];

export function TrackOrder() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 text-white hover:bg-orange-700">
          <MapPin className="mr-2 h-4 w-4" />
          Track Order
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-dvh max-w-md flex-col items-center overflow-hidden overflow-y-auto p-6">
        <div className="bg-muted-foreground h-80 w-full animate-pulse rounded-3xl" />
        <div className="w-fit">
          <h2 className="mb-4 text-lg font-semibold">Trip</h2>
          <div className="">
            {orderStatuses.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      item.completed ? item.bgColor : "bg-gray-300"
                    } ${item.active ? "ring-2 ring-orange-300 dark:ring-orange-500/50" : ""}`}
                  />
                  {index < orderStatuses.length - 1 && (
                    <div className="h-8 w-0.5 bg-gray-200" />
                  )}
                </div>
                <div className="-mt-1.5">
                  <span className="text-sm text-gray-500">Status: </span>
                  <span
                    className={item.completed ? item.color : "text-gray-400"}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
