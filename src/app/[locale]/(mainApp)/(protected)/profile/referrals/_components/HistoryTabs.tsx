import { Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PointsHistoryEntry,
  ReferredUserEntry,
  UsageHistoryEntry,
} from "@/types/profile.types";

import PointsHistory from "./PointsHistory";
import ReferredUsers from "./ReferredUsers";
import UsageHistroy from "./UsageHistroy";

interface HistoryTabsProps {
  pointsHistory: PointsHistoryEntry[];
  usageHistory: UsageHistoryEntry[];
  referredUsers: ReferredUserEntry[];
}

export function HistoryTabs({
  pointsHistory,
  usageHistory,
  referredUsers,
}: HistoryTabsProps) {
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
            <PointsHistory pointsHistory={pointsHistory} />
          </TabsContent>

          <TabsContent value="usage" className="mt-4">
            <UsageHistroy usageHistory={usageHistory} />
          </TabsContent>

          <TabsContent value="referrals" className="mt-4">
            <ReferredUsers referredUsers={referredUsers} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
