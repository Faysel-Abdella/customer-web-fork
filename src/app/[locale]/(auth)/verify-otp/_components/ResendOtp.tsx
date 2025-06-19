import React, { useEffect } from "react";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useResendOtp } from "@/hooks/authHooks/useResendOtp";

interface ResendOtpProps {
  contact_no: string;
  country_code: string;
}
const ResendOtp = ({ contact_no, country_code }: ResendOtpProps) => {
  const toastTrans = useTranslations("toast");
  const t = useTranslations("auth.verification");

  const { Otp, error, isLoading, resendOtp } = useResendOtp();

  const handleResendOtp = () => {
    resendOtp({
      "User[contact_no]": contact_no,
      "User[country_code]": country_code,
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(toastTrans("error"), { description: error });
    }
    if (Otp) {
      toast.message(toastTrans("here_otp"), {
        description: Otp,
      });
    }
  }, [error, Otp, toastTrans]);
  return (
    <Button
      type="button"
      variant={"link"}
      onClick={handleResendOtp}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : t("resend_link")}
    </Button>
  );
};

export default ResendOtp;
