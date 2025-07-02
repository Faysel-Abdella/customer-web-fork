import { Suspense } from "react";

import TitleBanner from "../../(marketing)/_components/TitleBanner";

import CheckoutForm from "./_components/CheckoutForm";
import CheckoutFormSkeleton from "./_components/CheckoutFormSkeleton.tsx";

const CheckoutPage = async () => {
  return (
    <div>
      <TitleBanner title={"Checkout"} className="pt-20" />
      <Suspense fallback={<CheckoutFormSkeleton />}>
        <CheckoutForm />
      </Suspense>
    </div>
  );
};

export default CheckoutPage;
