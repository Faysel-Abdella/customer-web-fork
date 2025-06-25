// src/components/layout/notification-popover.tsx

import React from "react";
import Link from "next/link";

import { BellIcon, Car, CheckCircle2, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// You can define a type for your notifications for type safety
type Notification = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
};

// Mock data - in a real app, you would fetch this from your API
const notifications: Notification[] = [
  {
    id: "1",
    icon: Car,
    title: "Your order is on its way!",
    description: "Your Kitfo from Genet Restaurant will arrive soon.",
  },
  {
    id: "2",
    icon: CheckCircle2,
    title: "Order confirmed",
    description: "We've received your order for Doro Wot.",
  },
  {
    id: "3",
    icon: Star,
    title: "Rate your last meal",
    description: "How was the Tibs from Kategna Restaurant?",
  },
];

export function NotificationPopover({
  className,
}: React.ComponentProps<"button">) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "text-foreground hover:bg-secondary hover:text-secondary-foreground relative flex size-10 cursor-pointer items-center justify-center transition-all hover:rounded-lg",
            className,
          )}
        >
          <BellIcon size={20} />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 md:w-96">
        <div className="flex flex-col">
          {/* Header */}
          <div className="p-4">
            <h4 className="text-lg font-semibold">Notifications</h4>
          </div>
          <Separator />

          <div className="max-h-80 space-y-4 overflow-y-auto p-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-4">
                  <notification.icon className="text-muted-foreground mt-1 h-5 w-5" />
                  <div className="grid gap-1">
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-muted-foreground text-sm">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground py-8 text-center">
                <p>You have no new notifications.</p>
              </div>
            )}
          </div>

          <Separator />
          <div className="p-2">
            <Link href="#" passHref>
              <Button variant="ghost" className="hover:bg-primary w-full">
                View All Notifications
              </Button>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
