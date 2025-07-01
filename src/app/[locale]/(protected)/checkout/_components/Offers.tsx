import React from "react";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Offers = () => {
  return (
    <Card className="py-0">
      <CardContent className="p-4">
        <h3 className="mb-3 text-lg font-semibold">Offers & Benefits</h3>
        <Button variant="ghost" className="h-auto w-full justify-between p-0">
          <span className="font-medium text-orange-500">Apply Offer</span>
          <ChevronRight className="h-5 w-5 text-orange-500" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Offers;
