import React from "react";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Notification } from "@/types/profile.types";

import NotificationDetail from "./NotificationDetail";

interface NotificationListItemProps {
  notification: Notification;
}
const NotificationListItem = ({ notification }: NotificationListItemProps) => {
  return (
    <Card
      key={notification.id}
      className={cn(
        `border shadow-none transition-all duration-200`,
        !notification.isRead && "border-muted-foreground",
      )}
    >
      <CardContent className="">
        <div className="flex items-start gap-4">
          <div></div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold`}>{notification.title}</h3>
                  {!notification.isRead && (
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  )}
                </div>
                <p
                  className={`text-muted-foreground mt-1 line-clamp-2 text-sm`}
                >
                  {notification.description}
                </p>
                <p className="text-muted-foreground mt-2 text-xs">
                  {format(notification.createdOn, "yyyy-mm-dd hh-MMa")}
                </p>
              </div>

              <div className="flex gap-1">
                {!notification.isRead && (
                  <Button variant="outline" size="sm" className="text-xs">
                    Mark Read
                  </Button>
                )}
                <NotificationDetail notification={notification} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationListItem;
