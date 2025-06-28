import React from "react";

import { format } from "date-fns";
import { Bell, CreditCard, Shield, ShoppingBag, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sampleNotifications = [
  {
    id: "notif-001",
    title: "Order Shipped",
    message: "Your order #ORD-002 has been shipped and is on its way!",
    type: "order",
    timestamp: "2024-01-15T10:30:00Z",
    read: false,
    icon: ShoppingBag,
  },
  {
    id: "notif-002",
    title: "Security Alert",
    message: "New login detected from Chrome on Windows in New York, NY",
    type: "security",
    timestamp: "2024-01-14T15:45:00Z",
    read: false,
    icon: Shield,
  },
  {
    id: "notif-003",
    title: "Payment Successful",
    message:
      "Your payment of $156.50 for order #ORD-002 was processed successfully",
    type: "payment",
    timestamp: "2024-01-14T09:20:00Z",
    read: true,
    icon: CreditCard,
  },
  {
    id: "notif-004",
    title: "Profile Updated",
    message: "Your profile information has been successfully updated",
    type: "account",
    timestamp: "2024-01-13T14:15:00Z",
    read: true,
    icon: User,
  },
  {
    id: "notif-005",
    title: "Special Offer",
    message: "Get 20% off your next order! Use code SAVE20 at checkout",
    type: "promotion",
    timestamp: "2024-01-12T11:00:00Z",
    read: true,
    icon: Bell,
  },
  {
    id: "notif-006",
    title: "Order Delivered",
    message: "Your order #ORD-001 has been delivered successfully",
    type: "order",
    timestamp: "2024-01-11T16:30:00Z",
    read: true,
    icon: ShoppingBag,
  },
];
const NotificationsPage = () => {
  const getNotificationColor = (type: string) => {
    switch (type) {
      case "order":
        return "bg-blue-500/10 border-blue-500";
      case "security":
        return "bg-red-500/10 border-red-500";
      case "payment":
        return "bg-green-500/10 border-green-500";
      case "account":
        return "bg-purple-500/10 border-purple-500";
      case "promotion":
        return "bg-yellow-500/10 border-yellow-500";
      default:
        return "bg-muted-foretext-muted-foreground/10 border-muted-foretext-muted-foreground";
    }
  };
  const unreadCount = sampleNotifications.filter((n) => !n.read).length;

  return (
    <div className="w-full space-y-6 px-10 py-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold">Notifications</h2>
          <p className="text-muted-foreground mt-2">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notifications`
              : "All caught up!"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            Settings
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {sampleNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`shadow-none transition-all duration-200 ${
              !notification.read
                ? getNotificationColor(notification.type)
                : "bg-background border"
            }`}
          >
            <CardContent className="">
              <div className="flex items-start gap-4">
                <div
                  className={`rounded-full p-2 ${
                    !notification.read
                      ? notification.type === "order"
                        ? "border border-blue-500 text-blue-600"
                        : notification.type === "security"
                          ? "border border-red-500 text-red-600"
                          : notification.type === "payment"
                            ? "border border-green-500 text-green-600"
                            : notification.type === "account"
                              ? "border border-purple-500 text-purple-600"
                              : "border border-yellow-500 text-yellow-600"
                      : "text-muted-foreground border-muted-foreground border"
                  }`}
                >
                  <notification.icon className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      <p className={`text-muted-foreground mt-1 text-sm`}>
                        {notification.message}
                      </p>
                      <p className="text-muted-foreground mt-2 text-xs">
                        {format(notification.timestamp, "yyyy-mm-dd hh-MMa")}
                      </p>
                    </div>

                    <div className="flex gap-1">
                      {!notification.read && (
                        <Button variant="outline" size="sm" className="text-xs">
                          Mark Read
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-muted-foreground text-xs"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sampleNotifications.length === 0 && (
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            <Bell className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">No notifications</h3>
            <p className="text-muted-foreground">
              You&apos;re all caught up! Check back later for new updates.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationsPage;
