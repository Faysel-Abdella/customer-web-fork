"use client";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader, Utensils } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PhoneInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/authHooks/useLogin";
import { Link } from "@/i18n/navigation";
import { loginSchema } from "@/lib/schemas/auth.schema";
import { cn } from "@/lib/utils";
import {
  CountryCode,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import Image from "next/image";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState<CountryCode | undefined>("ET");

  const { error, isLoading, isSuccess, login, user } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      contact_no: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    const phoneNumberObj = parsePhoneNumberFromString(
      form.getValues("contact_no")
    );
    const contact_no = phoneNumberObj?.nationalNumber || "";
    const country_code = country ? getCountryCallingCode(country) : "";
    const uuid = "3df82109-11be-4efa-8da2-1c96af2621b4";
    login({
      "LoginForm[username]": contact_no,
      "LoginForm[country_code]": "+" + country_code,
      "LoginForm[password]": values.password,
      "LoginForm[role]": 2,
      "LoginForm[device_type]": 2,
      "LoginForm[device_token]": uuid,
      "LoginForm[device_udid]": uuid,
    });
  }

  useEffect(() => {
    if (error) {
      toast("Error", error);
    }
    if (isSuccess) {
      toast.success(`Welcome ${user?.full_name}`);
    }
  }, [error, isSuccess, user]);

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
                <span className='sr-only'>Time Delivery Inc.</span>
              </a>
              <h1 className='text-xl font-bold '>
                Welcome to Time Delivery Inc.
              </h1>
            </div>
            <div className='flex flex-col gap-6'>
              <FormField
                control={form.control}
                name='contact_no'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        id='phone-number'
                        defaultCountry='ET'
                        {...field}
                        onCountryChange={setCountry}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='flex'>
                        <Input
                          id='password'
                          type={showPassword ? "text" : "password"}
                          placeholder='********'
                          {...field}
                        />
                        <button
                          className=' -m-6 cursor-pointer'
                          type='button'
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

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
                {isLoading ? <Loader className='animate-spin' /> : "Login"}
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
      </Form>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{" "}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
