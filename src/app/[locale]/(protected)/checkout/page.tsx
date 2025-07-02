import TitleBanner from "../../(marketing)/_components/TitleBanner";

import CheckoutForm from "./_components/CheckoutForm";

const CheckoutPage = async () => {
  return (
    <div>
      <TitleBanner title={"Checkout"} className="pt-20" />
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
