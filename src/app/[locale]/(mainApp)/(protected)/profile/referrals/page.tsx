import { Suspense } from "react";

import ReferralDetails from "./_components/ReferralDetails";
import { ReferralDetailsSkeleton } from "./_components/ReferralDetailsSkeleton";

const RefarralsPage = () => {
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-10">
      <div>
        <h2 className="text-3xl font-bold">Your Referral Code</h2>
        <p className="text-muted-foreground mt-2">
          Share your referral code with friends and earn rewards when they sign
          up.
        </p>
      </div>
      <Suspense fallback={<ReferralDetailsSkeleton />}>
        <ReferralDetails />
      </Suspense>
    </div>
  );
};

export default RefarralsPage;
