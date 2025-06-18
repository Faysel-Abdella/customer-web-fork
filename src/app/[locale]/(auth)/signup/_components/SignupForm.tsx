"use client";
import { Eye, EyeOff, Loader, Utensils } from "lucide-react";
import { useEffect, useState } from "react";

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
import { Link } from "@/i18n/navigation";
import { signupSchema } from "@/lib/schemas/auth.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumberFromString, {
  CountryCode,
  getCountryCallingCode,
} from "libphonenumber-js";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useSignup } from "@/hooks/authHooks/useSignup";

const SignupForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [country, setCountry] = useState<CountryCode | undefined>("ET");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { error, isLoading, signup } = useSignup();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      contact_no: "",
      password: "",
      confirm_password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    const phoneNumberObj = parsePhoneNumberFromString(
      form.getValues("contact_no")
    );
    const contact_no = phoneNumberObj?.nationalNumber || "";
    const country_code = country ? getCountryCallingCode(country) : "";

    signup({
      "User[contact_no]": contact_no,
      "User[country_code]": "+" + country_code,
      "User[first_name]": values.first_name,
      "User[last_name]": values.first_name,
      "User[password]": values.password,
      "User[role_id]": "2",
      confirm_password: values.confirm_password,
    });
  }

  useEffect(() => {
    if (error) {
      toast.error("Error", { description: error });
    }
  }, [error]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <FormField
                  control={form.control}
                  name='first_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder='John' {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='last_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Doe' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                        onCountryChange={setCountry}
                        {...field}
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
              <FormField
                control={form.control}
                name='confirm_password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className='flex'>
                        <Input
                          id='confirm-password'
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder='********'
                          {...field}
                        />
                        <button
                          className=' -m-6 cursor-pointer'
                          type='button'
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          {showConfirmPassword ? (
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
              <div className='flex gap-2 items-center text-sm'>
                <Checkbox
                  id='agreeTerms'
                  checked={agreeToTerms}
                  onCheckedChange={(checked) =>
                    setAgreeToTerms(checked === true)
                  }
                />
                <div className='flex gap-2'>
                  <Label htmlFor='agreeTerms'>I agree with all</Label>
                  <Link href={"#"} className='underline hover:text-primary'>
                    Terms & Conditions
                  </Link>
                </div>
              </div>
              <Button type='submit' className='w-full' disabled={!agreeToTerms}>
                {isLoading ? <Loader className='animate-spin' /> : "Signup"}
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
      </Form>
    </div>
  );
};

export default SignupForm;
