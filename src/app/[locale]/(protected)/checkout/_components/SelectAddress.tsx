import React from "react";

import { MapPin, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SelectAddress = () => {
  return (
    <Card className="py-0">
      <CardContent className="p-4">
        <h3 className="mb-3 text-lg font-semibold">Add Address</h3>
        <Button variant="ghost" className="h-auto w-full justify-between p-0">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-orange-500 p-2">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium">Add Address</span>
          </div>
          <div className="rounded-full bg-orange-500 p-1">
            <Plus className="h-4 w-4 text-white" />
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SelectAddress;
