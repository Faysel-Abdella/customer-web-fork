import React from "react";

import { Edit, Trash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AddAddressModel from "./AddAddressModel";

const Addresses = () => {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold">Addresses</h2>
          <p className="text-muted-foreground mt-2">
            Manage your shipping and billing addresses.
          </p>
        </div>
        <AddAddressModel />
      </div>

      <div className="grid gap-6">
        <Card className="shadow-none">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg">Home Address</CardTitle>
                <Badge variant="secondary">Default</Badge>
              </div>
              <div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-muted-foreground space-y-1">
              <p>123 Main Street</p>
              <p>WKJ+F</p>
              <p>Ziway, Oromia 0000</p>
            </div>
            <div>
              <Button size={"sm"} disabled>
                Set Default
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg">Work Address</CardTitle>
              </div>
              <div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-muted-foreground space-y-1">
              <p>123 Main Street</p>
              <p>WKJ+F</p>
              <p>Ziway, Oromia 0000</p>
            </div>
            <div>
              <Button size={"sm"}>Set Default</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Addresses;
