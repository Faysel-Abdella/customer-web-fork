import React from "react";

import { Edit, Trash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Address } from "@/types/profile.types";

interface AddressListItemProps {
  address: Address;
}
const AddressListItem = ({ address }: AddressListItemProps) => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg">{address.title}</CardTitle>
            {address.is_default == 1 && (
              <Badge variant="secondary">Default</Badge>
            )}
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
          <p>{address.address}</p>
          <p>{address.description}</p>
          <p>{address.pincode}</p>
        </div>
        <div>
          <Button size={"sm"} disabled>
            Set Default
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressListItem;
