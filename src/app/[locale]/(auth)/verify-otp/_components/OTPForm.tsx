"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { oTPSchema } from "@/lib/schemas/auth.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Utensils } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function OTPForm({ className, ...props }: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof oTPSchema>>({
    resolver: zodResolver(oTPSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(data: z.infer<typeof oTPSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className='mt-2 w-[320px] rounded-md bg-neutral-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col items-center gap-2'>
              <a
                href='#'
                className='flex flex-col items-center gap-2 font-medium'
              >
                <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg'>
                  <Utensils className='text-background' />
                </div>
                <span className='sr-only'>Acme Inc.</span>
              </a>
              <h1 className='text-xl font-bold'>Verification</h1>
              <div className='text-center text-muted-foreground text-sm'>
                Enter the 4 digit code to verify your phone number
              </div>
            </div>
            <div className='flex flex-col gap-6 items-center'>
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-center'>
                    <FormControl>
                      <InputOTP maxLength={4} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSeparator />
                          <InputOTPSlot index={1} />
                          <InputOTPSeparator />
                          <InputOTPSlot index={2} />
                          <InputOTPSeparator />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full'>
                Verify
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default OTPForm;
