<<<<<<< HEAD
import FormattedAfghani from "@/components/FormattedAfghani";
=======
>>>>>>> 3b055c3 (feat: add first draft of referral section ui with mock data)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PointsSummary, ReferralStats } from "@/types/profile.types";

interface PointsOverviewProps {
  pointsSummary: PointsSummary;
  referralStats: ReferralStats;
  currentDiscountPotential: number;
}

export function PointsOverview({
  pointsSummary,
  referralStats,
  currentDiscountPotential,
}: PointsOverviewProps) {
  return (
<<<<<<< HEAD
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Card className="justify-between border shadow-none">
=======
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border shadow-none">
>>>>>>> 3b055c3 (feat: add first draft of referral section ui with mock data)
        <CardHeader className="pb-3">
          <CardTitle className="text-secondary-foreground text-sm font-medium">
            Available Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">
            {pointsSummary.current_available.toLocaleString()}
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            {currentDiscountPotential}% max discount available
          </p>
        </CardContent>
      </Card>

<<<<<<< HEAD
      <Card className="justify-between border shadow-none">
=======
      <Card className="border shadow-none">
>>>>>>> 3b055c3 (feat: add first draft of referral section ui with mock data)
        <CardHeader className="pb-3">
          <CardTitle className="text-secondary-foreground text-sm font-medium">
            Total Earned
          </CardTitle>
        </CardHeader>
<<<<<<< HEAD
        <CardContent className="">
=======
        <CardContent>
>>>>>>> 3b055c3 (feat: add first draft of referral section ui with mock data)
          <div className="text-2xl font-bold text-blue-400">
            {pointsSummary.total_earned.toLocaleString()}
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            All time earnings
          </p>
        </CardContent>
      </Card>

<<<<<<< HEAD
      <Card className="justify-between border shadow-none">
=======
      <Card className="border shadow-none">
>>>>>>> 3b055c3 (feat: add first draft of referral section ui with mock data)
        <CardHeader className="pb-3">
          <CardTitle className="text-secondary-foreground text-sm font-medium">
            Referrals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-400">
            {referralStats.total_referred_users}
          </div>
          <p className="text-muted-foreground mt-1 text-xs">Friends referred</p>
        </CardContent>
      </Card>

<<<<<<< HEAD
      <Card className="justify-between border shadow-none">
=======
      <Card className="border shadow-none">
>>>>>>> 3b055c3 (feat: add first draft of referral section ui with mock data)
        <CardHeader className="pb-3">
          <CardTitle className="text-secondary-foreground text-sm font-medium">
            Discount Earned
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-400">
<<<<<<< HEAD
            <FormattedAfghani
              amount={referralStats.total_discount_earned / 100}
            />
=======
            ${(referralStats.total_discount_earned / 100).toFixed(2)}
>>>>>>> 3b055c3 (feat: add first draft of referral section ui with mock data)
          </div>
          <p className="text-muted-foreground mt-1 text-xs">Total savings</p>
        </CardContent>
      </Card>
    </div>
  );
}
