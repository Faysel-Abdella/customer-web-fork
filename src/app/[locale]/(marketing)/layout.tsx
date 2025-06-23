import React, { PropsWithChildren } from "react";

import Header from "./_components/Header";

const MarketingPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MarketingPageLayout;
