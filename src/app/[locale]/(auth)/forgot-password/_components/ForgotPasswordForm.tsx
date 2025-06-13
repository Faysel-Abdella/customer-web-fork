import { PhoneInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
              <div className='flex size-8 items-center justify-center rounded-md'>
                <p className='text-3xl font-bold font-mono'>LOGO</p>
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
