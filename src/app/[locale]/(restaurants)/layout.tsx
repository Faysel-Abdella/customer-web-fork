import React, { PropsWithChildren } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const RestaurantsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default RestaurantsLayout;
