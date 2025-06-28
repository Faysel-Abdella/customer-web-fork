"use client";
import React from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { PhoneInput } from "@/components/PhoneNumberInput";
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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addressSchema } from "@/lib/schemas/address.schema";
const AddAddressModel = () => {
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressType: "Home",
      houseAddress: "",
      floor: "",
      landmark: "",
      pinCode: "",
      mobileNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof addressSchema>) {
    console.log(values);

    toast("Address Saved!", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Address</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new addresss</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="addressType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Save address as*</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      {["Home", "Office", "Hotel", "Other"].map((type) => (
                        <FormItem
                          key={type}
                          className="flex items-center space-y-0 space-x-2"
                        >
                          <FormControl>
                            <RadioGroupItem value={type} />
                          </FormControl>
                          <FormLabel className="font-normal">{type}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="houseAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House / Street Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Near St. George's Church"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Floor</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 3rd Floor, Apt 301" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="landmark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nearby Landmark</FormLabel>
                    <FormControl>
                      <Input placeholder="(Optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <PhoneInput
                    id="phone-number"
                    defaultCountry="ET"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pinCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pin Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter pin code (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="!mt-8 w-full">
              Save Address
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModel;
