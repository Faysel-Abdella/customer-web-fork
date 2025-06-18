"use client";
import { Loader, Utensils } from "lucide-react";
import { useEffect, useState } from "react";

import { PhoneInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { profileSetupSchema } from "@/lib/schemas/auth.schema";
import { cn, formatYYYYMMDD } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumberFromString, {
  CountryCode,
  getCountryCallingCode,
} from "libphonenumber-js";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useUpdateProfile } from "@/hooks/authHooks/useUpdateProfile";
import { useAuth } from "@/contexts/AuthContext";

const ProfileSetupForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { user } = useAuth();
  const [country, setCountry] = useState<CountryCode | undefined>("ET");

  const { error, isLoading, updateProfile } = useUpdateProfile();

  const form = useForm<z.infer<typeof profileSetupSchema>>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      contact_no: user ? user.country_code + user.contact_no : "",
      gender: user ? user.gender.toString() : "",
      dob: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof profileSetupSchema>) {
    const phoneNumberObj = parsePhoneNumberFromString(
      form.getValues("contact_no")
    );
    const contact_no = phoneNumberObj?.nationalNumber || "";
    const country_code = country ? getCountryCallingCode(country) : "";

    updateProfile({
      "User[contact_no]": contact_no,
      "User[country_code]": country_code,
      "User[date_of_birth]": formatYYYYMMDD(values.dob),
      "User[gender]": values.gender,
      "User[first_name]": values.first_name,
      "User[last_name]": values.last_name,
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
              <h1 className='text-xl font-bold '>Setup Your Account</h1>
            </div>
            <div className='flex flex-col gap-6'>
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

              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Gender' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='0'>Male</SelectItem>
                          <SelectItem value='1'>Female</SelectItem>
                          <SelectItem value='2'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name='dob'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <DatePicker {...field} className='w-full' />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
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

              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? <Loader className='animate-spin' /> : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileSetupForm;
