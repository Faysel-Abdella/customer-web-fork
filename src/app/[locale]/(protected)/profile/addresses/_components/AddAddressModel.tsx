"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumberFromString, {
  CountryCode,
  getCountryCallingCode,
} from "libphonenumber-js";
import { toast } from "sonner";
import { z } from "zod";

import { addAddress } from "@/actions/profile.actions";
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
import { objectToFormData } from "@/lib/utils";

import { LocationPicker } from "./LocationPicker";

const addressTypes = [
  {
    title: "Home",
    value: "1",
  },
  {
    title: "Office",
    value: "2",
  },
  {
    title: "Hotel",
    value: "3",
  },
  {
    title: "Other",
    value: "4",
  },
];
const AddAddressModel = () => {
  const [country, setCountry] = useState<CountryCode | undefined>("ET");
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      title: "",
      addressType: "1",
      address: "",
      landmark: "",
      pinCode: "",
      contact_no: "",
    },
  });

  function onSubmit(values: z.infer<typeof addressSchema>) {
    const phoneNumberObj = parsePhoneNumberFromString(
      form.getValues("contact_no"),
    );
    const contact_no = phoneNumberObj?.nationalNumber || "";
    const country_code = country ? getCountryCallingCode(country) : "";

    const data = objectToFormData({
      "AddressManagement[title]": values.title,
      "AddressManagement[address]": values.address,
      "AddressManagement[country_code]": "+" + country_code,
      "AddressManagement[contact_no]": contact_no,
      "AddressManagement[latitude]": 8.5413,
      "AddressManagement[longitude]": 39.2689,
      "AddressManagement[type_id]": parseInt(values.addressType),
      "AddressManagement[description]": values.landmark,
      "AddressManagement[floor]": values.floor,
      "AddressManagement[pincode]": values.pinCode,
    });

    startTransition(async () => {
      const results = await addAddress(data);

      if (results.success) {
        toast.success("Address Saved!");
        setOpen(false);
      }

      if (results.error) {
        toast.error("Failed at adding address,please try again.");
      }
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Address</Button>
      </DialogTrigger>
      <DialogContent className="max-h-dvh w-7xl max-w-7xl min-w-3xl overflow-y-auto lg:min-w-4xl xl:min-w-5xl">
        <DialogHeader>
          <DialogTitle>Add new addresss</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex gap-5">
          <LocationPicker
            onLocationSelect={({ address, position }) => {
              console.log({ address, position });
            }}
            className="w-1/2"
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-1/2 space-y-6"
            >
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
                        {addressTypes.map((addressType) => (
                          <FormItem
                            key={addressType.value}
                            className="flex items-center space-y-0 space-x-2"
                          >
                            <FormControl>
                              <RadioGroupItem value={addressType.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {addressType.title}
                            </FormLabel>
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Home" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
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
                        <Input
                          placeholder="e.g. 3rd Floor, Apt 301"
                          {...field}
                        />
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
                name="contact_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <PhoneInput
                      id="phone-number"
                      defaultCountry="ET"
                      {...field}
                      onCountryChange={setCountry}
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
                      <Input
                        placeholder="Enter pin code (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="!mt-8 w-full"
                disabled={isPending}
              >
                Save Address
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModel;
