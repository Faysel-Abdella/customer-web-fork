"use client";
import { useState } from "react";
import { Eye, EyeOff, Utensils } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { PhoneInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";

const SignupForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col items-center gap-2'>
            <a
              href='#'
              className='flex flex-col items-center gap-2 font-medium'
            >
              <div className='w-16 h-16 mx-auto  bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center '>
                <Utensils className='text-background' />
              </div>
              <span className='sr-only'>Time Delivery Inc.</span>
            </a>
            <h1 className='text-xl font-bold '>Join FoodExpress</h1>
            <h3 className='text-muted-foreground font-bold '>
              Create Your Account
            </h3>
          </div>
          <div className='flex flex-col gap-6'>
            <div className=' flex w-full gap-2'>
              <div className='grid gap-3'>
                <Label htmlFor='firstName'>First Name</Label>
                <Input id='firstName' placeholder='John' required />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='lastName'>Last Name</Label>
                <Input id='lastName' placeholder='Doe' required />
              </div>
            </div>
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
            <div className='grid gap-3'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <div className='flex'>
                <Input
                  id='password'
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='********'
                />
                <button
                  className=' -m-6 cursor-pointer'
                  type='button'
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <Eye size={16} />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </button>
              </div>
            </div>
            <div className='flex gap-2 items-center text-sm'>
              <Checkbox />
              <div>
                I agree with all{" "}
                <Link href={"#"} className='underline hover:text-primary'>
                  Terms & Conditions
                </Link>
              </div>
            </div>
            <Button type='submit' className='w-full'>
              Sign Up
            </Button>
            <div className='text-center text-sm'>
              Already have an account?{" "}
              <Link
                href='/login'
                className='hover:underline underline-offset-4 text-primary font-semibold'
              >
                Login
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
    </div>
  );
};

export default SignupForm;
