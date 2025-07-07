import React from "react";

import FaqList from "./_components/FaqList";

const FaqPage = () => {
  return (
    <div className="w-full px-1 py-5 md:px-10">
      <div className="mb-5">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mt-2">
          Find answers to common inquiries about our products, services, and
          policies.
        </p>
      </div>
      <FaqList />
    </div>
  );
};

export default FaqPage;
