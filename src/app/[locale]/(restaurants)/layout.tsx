import { PropsWithChildren } from "react";
import { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Explore Restaurants for Delivery  | Time delivery",
  description:
    "Find the best local restaurants on Time delivery. browse a wide variety of cuisines, view ratings, and order online for fast delivery.",
};
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
