"use client";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { cancelOrder } from "@/actions/profile.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "@/i18n/navigation";
interface OrderCancelModalProps {
  orderId: number;
}

const FormSchema = z.object({
  reason: z
    .string()
    .min(10, {
      message: "Your reason must be at least 10 characters.",
    })
    .max(100, {
      message: "Your reason must not be longer than 100 characters.",
    }),
});

const OrderCancelModal = ({ orderId }: OrderCancelModalProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { success, error } = await cancelOrder(orderId, data.reason);

    if (success) {
      router.push("/profile/orders");
      toast.success("Successfully cancelled order");
    } else if (error) {
      toast.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary w-full py-3 text-lg font-semibold text-white hover:bg-orange-600">
          Cancel Order
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel order</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your reason for canceling</FormLabel>
                  <FormControl>
                    <Textarea className="w-full resize-none" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Cancel</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderCancelModal;
