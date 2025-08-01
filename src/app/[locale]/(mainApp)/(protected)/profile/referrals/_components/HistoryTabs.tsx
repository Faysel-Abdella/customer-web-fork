import { format } from "date-fns";
import { Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PointsHistoryEntry } from "@/types/profile.types";

interface HistoryTabsProps {
  pointsHistory: PointsHistoryEntry[];
  usageHistory?: UsageHistoryEntry[];
  referredUsers?: ReferredUser[];
}

export interface UsageHistoryEntry {
  id: number;
  order_id: string;
  points_used: number;
  discount_percent: number;
  discount_amount: number;
  created_at: string;
}

export interface ReferredUser {
  id: number;
  name: string;
  email: string;
  joined_at: string;
  points_earned: number;
  status: "active" | "inactive";
}

export function HistoryTabs({
  pointsHistory,
  usageHistory,
  referredUsers,
}: HistoryTabsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="border shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Activity & History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="points" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="points">Points History</TabsTrigger>
            <TabsTrigger value="usage">Usage History</TabsTrigger>
            <TabsTrigger value="referrals">Referred Users</TabsTrigger>
          </TabsList>

          <TabsContent value="points" className="mt-4">
            <div className="space-y-4">
              {pointsHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between border-b py-3 last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{entry.reason}</p>
                    {entry.created_at && (
                      <p className="text-muted-foreground text-xs">
                        {format(
                          new Date(entry.created_at),
                          "MMM dd',' yyyy',' hh:mm aa",
                        )}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        entry.type === "earned" ? "default" : "secondary"
                      }
                      className={
                        entry.type === "earned"
                          ? "border-green-500 bg-green-500/5 text-green-500 hover:bg-green-100"
                          : "border-red-500 bg-red-500/5 text-red-500 hover:bg-red-100"
                      }
                    >
                      {entry.type === "earned" ? "+" : ""}
                      {entry.points}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="mt-4">
            <div className="space-y-4">
              {usageHistory &&
                usageHistory.map((usage) => (
                  <div
                    key={usage.id}
                    className="flex items-center justify-between border-b py-3 last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Order #{usage.order_id}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatDate(usage.created_at)}
                      </p>
                      <p className="text-secondary-foreground text-xs">
                        {usage.discount_percent}% discount applied
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-600">
                        -{usage.points_used} points
                      </p>
                      <p className="text-xs text-green-600">
                        Saved ${usage.discount_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="referrals" className="mt-4">
            <div className="space-y-4">
              {referredUsers &&
                referredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between border-b py-3 last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {user.email}
                      </p>
                      <p className="text-secondary-foreground text-xs">
                        Joined {formatDate(user.joined_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          user.status === "active" ? "default" : "secondary"
                        }
                        className={
                          user.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "text-secondary-foreground bg-gray-100 hover:bg-gray-100"
                        }
                      >
                        {user.status}
                      </Badge>
                      <p className="mt-1 text-xs text-green-600">
                        +{user.points_earned} points earned
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
