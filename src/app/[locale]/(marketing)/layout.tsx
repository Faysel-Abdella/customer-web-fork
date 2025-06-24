import React, { PropsWithChildren } from "react";

import Footer from "@/components/Footer";

import Header from "./_components/Header";

const MarketingPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MarketingPageLayout;
