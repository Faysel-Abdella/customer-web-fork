"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumberFromString, {
  CountryCode,
  getCountryCallingCode,
} from "libphonenumber-js";
import { Loader, Utensils } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateProfile } from "@/hooks/authHooks/useUpdateProfile";
import { useRouter } from "@/i18n/navigation";
import { profileSetupSchema } from "@/lib/schemas/auth.schema";
import { cn, formatYYYYMMDD } from "@/lib/utils";

import ProfileSetupFormFields from "./ProfileSetupFormFields";

const ProfileSetupForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const t = useTranslations("auth.account_setup");
  const { user } = useAuth();
  const [country, setCountry] = useState<CountryCode | undefined>("ET");
  const router = useRouter();

  if (!user?.contact_no) {
    router.push("/home");
  }

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
      form.getValues("contact_no"),
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
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500">
                  <Utensils className="text-background" />
                </div>
                <span className="sr-only">Time Delivery Inc.</span>
              </a>
              <h1 className="text-xl font-bold">{t("title")}</h1>
            </div>
            <div className="flex flex-col gap-6">
              <ProfileSetupFormFields form={form} setCountry={setCountry} />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  t("save_button")
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileSetupForm;
