import { Suspense } from "react";

<<<<<<< HEAD
import ReferralDetails from "./_components/ReferralDetails";
import { ReferralDetailsSkeleton } from "./_components/ReferralDetailsSkeleton";

const RefarralsPage = () => {
=======
import { UserPointsProfileResponse } from "@/types/profile.types";

import { HistoryTabs } from "./_components/HistoryTabs";
import { PointsOverview } from "./_components/PointsOverview";
import { RedemptionRules } from "./_components/RedemptionRules";
import { ReferralSharing } from "./_components/ReferralSharing";
import { ReferralStatsCard } from "./_components/ReferralStatsCard";

export const mockData: UserPointsProfileResponse = {
  user_info: {
    id: 1,
    name: "John Doe",
    referral_code: "REF2024XYZ123",
    referred_by: null,
  },
  points_summary: {
    total_earned: 2500,
    total_used: 800,
    current_available: 1700,
    min_points_to_redeem: 100,
    points_per_percent_discount: 50,
    max_percent_discount_per_order: "20.00",
  },
  points_history: [
    {
      id: 1,
      points: 200,
      reason: "Friend signed up using your referral code",
      created_at: "2024-01-15T10:30:00Z",
      type: "earned",
    },
    {
      id: 2,
      points: -150,
      reason: "Redeemed 3% discount on order #12345",
      created_at: "2024-01-10T14:20:00Z",
      type: "used",
    },
    {
      id: 3,
      points: 300,
      reason: "Welcome bonus for joining referral program",
      created_at: "2024-01-05T09:15:00Z",
      type: "earned",
    },
    {
      id: 4,
      points: -100,
      reason: "Redeemed 2% discount on order #12340",
      created_at: "2024-01-02T16:45:00Z",
      type: "used",
    },
  ],
  usage_history: [
    {
      id: 1,
      order_id: "ORD-12345",
      points_used: 150,
      discount_percent: 3,
      discount_amount: 12.5,
      created_at: "2024-01-10T14:20:00Z",
    },
    {
      id: 2,
      order_id: "ORD-12340",
      points_used: 100,
      discount_percent: 2,
      discount_amount: 8.75,
      created_at: "2024-01-02T16:45:00Z",
    },
  ],
  referred_users: [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      joined_at: "2024-01-15T10:30:00Z",
      points_earned: 200,
      status: "active",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      joined_at: "2024-01-08T09:15:00Z",
      points_earned: 200,
      status: "active",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      joined_at: "2023-12-20T11:45:00Z",
      points_earned: 200,
      status: "inactive",
    },
  ],
  referral_stats: {
    total_referred_users: 12,
    total_orders_with_referral_discount: 8,
    total_discount_earned: 2400,
  },
};

const RefarralsPage = () => {
  const maxDiscount = Number.parseFloat(
    mockData.points_summary.max_percent_discount_per_order,
  );
  const currentDiscountPotential = Math.min(
    Math.floor(
      mockData.points_summary.current_available /
        mockData.points_summary.points_per_percent_discount,
    ),
    maxDiscount,
  );

>>>>>>> 3b055c3 (feat: add first draft of referral section ui with mock data)
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-10">
      <div>
        <h2 className="text-3xl font-bold">Your Referral Code</h2>
        <p className="text-muted-foreground mt-2">
          Share your referral code with friends and earn rewards when they sign
          up.
        </p>
      </div>
<<<<<<< HEAD
      <Suspense fallback={<ReferralDetailsSkeleton />}>
        <ReferralDetails />
      </Suspense>
=======

      <div className="">
        <PointsOverview
          currentDiscountPotential={mockData.points_summary.current_available}
          pointsSummary={mockData.points_summary}
          referralStats={mockData.referral_stats}
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <ReferralSharing referralCode={mockData.user_info.referral_code} />
            <HistoryTabs pointsHistory={mockData.points_history} />
          </div>
          <div className="space-y-6">
            <RedemptionRules
              pointsSummary={mockData.points_summary}
              currentDiscountPotential={currentDiscountPotential}
              maxDiscount={maxDiscount}
            />

            <ReferralStatsCard stats={mockData.referral_stats} />
          </div>
        </div>
      </div>
>>>>>>> 3b055c3 (feat: add first draft of referral section ui with mock data)
    </div>
  );
};

export default RefarralsPage;
