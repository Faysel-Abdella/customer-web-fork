"use client";
import { useTransition } from "react";

import { Edit, Loader2, Trash } from "lucide-react";

import { deleteAddress } from "@/actions/profile.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Address } from "@/types/profile.types";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
interface AddressListItemProps {
  address: Address;
}
const AddressListItem = ({ address }: AddressListItemProps) => {
  const [isDeleting, startDelete] = useTransition();
  const router = useRouter();

  const handleDeleteAddreses = () => {
    startDelete(async () => {
      const results = await deleteAddress(address.id.toString());
      if (results.success) {
        toast.success("Successfully deleted address");
        router.push("/profile/addresses");
      }
      if (results.error) {
        toast.success("Failed at deleting address");
      }
    });
  };
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

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" disabled={isDeleting}>
                  {isDeleting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4 text-red-500" />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your this address. and remove the data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAddreses}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
