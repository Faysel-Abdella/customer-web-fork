"use client";
import { useState } from "react";

import { Eye, EyeOff, Utensils } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/phone-input";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
              <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg'>
                <Utensils className='text-background' />
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
            <Button variant='outline' type='button' className='w-full'>
              <Image
                src={"/assets/images/brand-icons/facebook.svg"}
                alt='facebook icon'
                width={25}
                height={25}
              />
            </Button>
            <Button variant='outline' type='button' className='w-full'>
              <Image
                src={"/assets/images/brand-icons/google.svg"}
                alt='google icon'
                width={20}
                height={20}
              />
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
