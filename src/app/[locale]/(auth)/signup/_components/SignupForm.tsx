"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumberFromString, {
  CountryCode,
  getCountryCallingCode,
} from "libphonenumber-js";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { z } from "zod";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useSignup } from "@/hooks/authHooks/useSignup";
import { Link } from "@/i18n/navigation";
import { signupSchema } from "@/lib/schemas/auth.schema";
import { cn } from "@/lib/utils";

import { GoogleLoginButton } from "../../_components/GoogleLoginButton";
import TermsAndConditions from "../../_components/TermsAndConditions";

import SignupFormFields from "./SignupFormFields";

const SignupForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const toastTrans = useTranslations("toast");
  const t = useTranslations("auth.signup");

  const [country, setCountry] = useState<CountryCode | undefined>("ET");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { error, isLoading, signup, Otp } = useSignup();

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
      form.getValues("contact_no"),
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
      toast.error(toastTrans("error"), { description: error });
    }
    if (Otp) {
      toast.message(toastTrans("here_otp"), { description: Otp });
    }
  }, [error, Otp, toastTrans]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-2">
              <Link
                href="/"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <Logo className="border-0" />
                <span className="sr-only">Time Inc.</span>
              </Link>
              <h1 className="text-xl font-bold">{t("title")}</h1>
              <h3 className="text-muted-foreground font-bold">
                {t("create_account")}
              </h3>
            </div>
            <div className="flex flex-col gap-6">
              <SignupFormFields form={form} setCountry={setCountry} />
              <div className="flex items-center gap-2 text-sm">
                <Checkbox
                  id="agreeTerms"
                  checked={agreeToTerms}
                  disabled={isLoading}
                  onCheckedChange={(checked) =>
                    setAgreeToTerms(checked === true)
                  }
                />
                <div className="flex gap-2">
                  <Label htmlFor="agreeTerms">{t("agree")}</Label>
                  <TermsAndConditions className="hover:text-primary underline">
                    {t("terms_of_service")}
                  </TermsAndConditions>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={!agreeToTerms || isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  t("signup_button")
                )}
              </Button>
              <div className="text-center text-sm">
                {t("already_have_account")}{" "}
                <Link
                  href="/login"
                  className="text-primary font-semibold underline-offset-4 hover:underline"
                >
                  {t("login_link")}
                </Link>
              </div>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                {t("or_divider")}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <GoogleLoginButton />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
