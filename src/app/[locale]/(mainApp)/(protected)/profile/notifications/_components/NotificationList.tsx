import { Bell, X } from "lucide-react";

import { getNotificationList } from "@/actions/profile.actions";
import { Card, CardContent } from "@/components/ui/card";

import NotificationListItem from "./NotificationListItem";

const NotificationList = async () => {
  const { data, error } = await getNotificationList();
  if (data)
    return (
      <div>
        <div className="space-y-3">
          {data.map((notification) => (
            <NotificationListItem
              key={notification.id}
              notification={notification}
            />
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
