import { Suspense } from "react";

import { Button } from "@/components/ui/button";

import NotificationList from "./_components/NotificationList";
import NotificationListSkeleton from "./_components/NotificationListSkeleton";

const NotificationsPage = () => {
  return (
    <div className="w-full space-y-6 px-10 py-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold">Notifications</h2>
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
      <Suspense fallback={<NotificationListSkeleton />}>
        <NotificationList />
      </Suspense>
    </div>
  );
};

export default NotificationsPage;
