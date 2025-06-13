"use client";
import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/phone-input";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
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
              <span className='sr-only'>Time Delivery Inc.</span>
            </a>
            <h1 className='text-xl font-bold '>
              Welcome to Time Delivery Inc.
            </h1>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-3'>
              <Label htmlFor='phone-number'>Mobile Number</Label>
              <PhoneInput id='phone-number' defaultCountry='ET' />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='password'>Password</Label>
              <div className='flex'>
                <Input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='********'
                />
                <button
                  className=' -m-6 cursor-pointer'
                  type='button'
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
            <div className='flex justify-between items-center '>
              <div className='flex gap-2 items-center'>
                <Checkbox id='remember-me' />
                <Label htmlFor='remember-me'>Remember me</Label>
              </div>
              <Link
                href={"/forgot-password"}
                className='text-sm font-semibold text-primary hover:underline'
              >
                Forgot Password?
              </Link>
            </div>
            <Button type='submit' className='w-full'>
              Login
            </Button>
            <div className='text-center text-sm'>
              Don&apos;t have an account?{" "}
              <Link
                href='/signup'
                className='hover:underline underline-offset-4 text-primary font-semibold'
              >
                Sign up
              </Link>
            </div>
          </div>
          <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
            <span className='bg-background text-muted-foreground relative z-10 px-2'>
              Or
            </span>
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            <Button
              variant='outline'
              type='button'
              className='w-full flex gap-1'
            >
              <svg
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 28'
                fill='currentColor'
                className='text-foreground'
              >
                <path d='M14.984 0.187v4.125h-2.453q-1.344 0-1.813 0.562t-0.469 1.687v2.953h4.578l-0.609 4.625h-3.969v11.859h-4.781v-11.859h-3.984v-4.625h3.984v-3.406q0-2.906 1.625-4.508t4.328-1.602q2.297 0 3.563 0.187z'></path>
              </svg>
              Continue with Facebook
            </Button>
            <Button variant='outline' type='button' className='w-full'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path
                  d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                  fill='currentColor'
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        </div>
      </form>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{" "}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
