"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumberFromString, {
  CountryCode,
  getCountryCallingCode,
} from "libphonenumber-js";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { z } from "zod";

import Logo from "@/components/Logo";
import { PhoneInput } from "@/components/PhoneNumberInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "@/i18n/navigation";
import { forgotPasswordSchema } from "@/lib/schemas/auth.schema";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("auth.forgot_password");
  const [country, setCountry] = useState<CountryCode | undefined>("ET");

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      contact_no: "",
    },
  });

  function onSubmit() {
    const phoneNumberObj = parsePhoneNumberFromString(
      form.getValues("contact_no"),
    );
    const contact_no = phoneNumberObj?.nationalNumber || "";
    const country_code = country ? getCountryCallingCode(country) : "";
    const data = { contact_no, country_code };
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <Link
                href="/"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <Logo className="border-0" />
                <span className="sr-only">Time Inc.</span>
              </Link>
              <h1 className="text-xl font-bold">{t("title")}</h1>
              <div className="text-muted-foreground text-center text-sm">
                {t("instruction")}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="contact_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("mobile_number")}</FormLabel>
                    <FormControl>
                      <PhoneInput
                        id="phone-number"
                        defaultCountry="ET"
                        {...field}
                        onCountryChange={setCountry}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {t("send_button")}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
