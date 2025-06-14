import { PhoneInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Utensils } from "lucide-react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
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
            <h1 className='text-xl font-bold'>Forgot Password</h1>
            <div className='text-center text-muted-foreground text-sm'>
              Enter the phone number associated with your account and we will
              send you a link with instruction to reset your password.
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-3'>
              <Label htmlFor='phone-number'>Mobile Number</Label>
              <PhoneInput id='phone-number' defaultCountry='ET' />
            </div>
            <Button type='submit' className='w-full'>
              Send
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
