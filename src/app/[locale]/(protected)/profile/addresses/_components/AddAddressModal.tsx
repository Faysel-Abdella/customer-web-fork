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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { addressSchema } from "@/lib/schemas/address.schema";
import { objectToFormData } from "@/lib/utils";

import AddressFormFields from "./AddressFormFields";
import { LocationPicker } from "./LocationPicker";

const AddAddressModal = () => {
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
      <DialogContent className="max-h-dvh min-w-dvw overflow-y-auto md:min-w-3xl lg:min-w-4xl xl:min-w-5xl">
        <DialogHeader>
          <DialogTitle>Add new addresss</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex gap-5 max-md:flex-col">
          <LocationPicker
            onLocationSelect={({ address, position }) => {
              console.log({ address, position });
            }}
            className="md:w-1/2"
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 md:w-1/2"
            >
              <AddressFormFields form={form} setCountry={setCountry} />

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

export default AddAddressModal;
