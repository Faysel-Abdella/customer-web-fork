import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentMethodsPage = () => {
  return (
    <div className="w-full space-y-6 px-10 py-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold">Payment Methods</h2>
          <p className="text-muted-foreground mt-2">
            Manage your saved payment methods.
          </p>
        </div>
        <Button>Add Payment Method</Button>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardContent className="">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="font-semibold">•••• •••• •••• 4242</p>
                <p className="text-muted-foreground text-sm">Expires 12/25</p>
                <Badge variant="secondary">Default</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="font-semibold">•••• •••• •••• 8888</p>
                <p className="text-muted-foreground text-sm">Expires 08/26</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
