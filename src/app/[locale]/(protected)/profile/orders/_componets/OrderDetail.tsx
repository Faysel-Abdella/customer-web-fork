import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const OrderDetail = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>View Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order details</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetail;
