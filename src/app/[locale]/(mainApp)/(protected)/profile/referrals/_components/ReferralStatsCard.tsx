import { Award, Gift, TrendingUp, Users } from "lucide-react";

import FormattedAfghani from "@/components/FormattedAfghani";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReferralStats } from "@/types/profile.types";

interface ReferralStatsProps {
  stats: ReferralStats;
}

export function ReferralStatsCard({ stats }: ReferralStatsProps) {
  return (
    <Card className="border shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Your Impact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-secondary-foreground text-sm">
              Friends joined
            </span>
          </div>
          <span className="font-medium">{stats.total_referred_users}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-green-400" />
            <span className="text-secondary-foreground text-sm">
              Orders with discount
            </span>
          </div>
          <span className="font-medium">
            {stats.total_orders_with_referral_discount}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 text-purple-400" />
            <span className="text-secondary-foreground text-sm">
              Total savings earned
            </span>
          </div>
          <span className="font-medium">
            <FormattedAfghani amount={stats.total_discount_earned / 100} />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
