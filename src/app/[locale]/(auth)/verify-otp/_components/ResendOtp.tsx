import React, { useEffect } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useResendOtp } from "@/hooks/authHooks/useResendOtp";

interface ResendOtpProps {
  contact_no: string;
  country_code: string;
}
const ResendOtp = ({ contact_no, country_code }: ResendOtpProps) => {
  const { Otp, error, isLoading, resendOtp } = useResendOtp();

  const handleResendOtp = () => {
    resendOtp({
      "User[contact_no]": contact_no,
      "User[country_code]": country_code,
    });
  };

  useEffect(() => {
    if (error) {
      toast.error("Error", { description: error });
    }
    if (Otp) {
      toast.message("Here is your OTP", {
        description: Otp,
      });
    }
  }, [error, Otp]);
  return (
    <Button
      type="button"
      variant={"link"}
      onClick={handleResendOtp}
      disabled={isLoading}
    >
      {isLoading ? "Sending otp" : "Resend"}
    </Button>
  );
};

export default ResendOtp;
