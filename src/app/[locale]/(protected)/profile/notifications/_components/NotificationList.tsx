import React from "react";

import { format } from "date-fns";
import { Bell, X } from "lucide-react";

import { getNotificationList } from "@/actions/profile.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const NotificationList = async () => {
  const { data, error } = await getNotificationList();
  if (data)
    return (
      <div>
        <div className="space-y-3">
          {data.map((notification) => (
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
                          <h3 className={`font-semibold`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          )}
                        </div>
                        <p className={`text-muted-foreground mt-1 text-sm`}>
                          {notification.description}
                        </p>
                        <p className="text-muted-foreground mt-2 text-xs">
                          {format(notification.createdOn, "yyyy-mm-dd hh-MMa")}
                        </p>
                      </div>

                      <div className="flex gap-1">
                        {!notification.isRead && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
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

        {data.length === 0 && (
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
        {error && (
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <X className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">
                Failed to fetch notifications
              </h3>
            </CardContent>
          </Card>
        )}
      </div>
    );
};

export default NotificationList;
