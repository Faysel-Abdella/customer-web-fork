import { Gift } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PointsSummary } from "@/types/profile.types";

interface RedemptionRulesProps {
  pointsSummary: PointsSummary;
  currentDiscountPotential: number;
  maxDiscount: number;
}

export function RedemptionRules({
  pointsSummary,
  currentDiscountPotential,
  maxDiscount,
}: RedemptionRulesProps) {
  return (
    <Card className="border shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Redemption Rules
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-secondary-foreground">Minimum to redeem</span>
            <span>{pointsSummary.min_points_to_redeem} points</span>
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-secondary-foreground">
              Points per 1% discount
            </span>
            <span>{pointsSummary.points_per_percent_discount} points</span>
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-secondary-foreground">
              Max discount per order
            </span>
            <span>{pointsSummary.max_percent_discount_per_order}%</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="text-secondary-foreground mb-2 text-sm">
            Current discount potential
          </div>
          <div className="flex items-center gap-2">
            <Progress
              value={(currentDiscountPotential / maxDiscount) * 100}
              className="flex-1"
            />
            <span className="text-sm font-medium">
              {currentDiscountPotential}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
