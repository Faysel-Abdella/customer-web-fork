import React, { PropsWithChildren } from "react";

import { CartProvider } from "@/contexts/CartContext";
import LocationProvider from "@/contexts/LocationContext";

const MainAppLayout = ({ children }: PropsWithChildren) => {
  return (
    <LocationProvider>
      <CartProvider>{children}</CartProvider>
    </LocationProvider>
  );
};

export default MainAppLayout;
