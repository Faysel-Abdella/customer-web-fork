import { HttpError } from "@/lib/api/HttpError";
import { objectToUrlEncoded, processError } from "@/lib/utils";
import { ResendOtpPayload, ResendOtpResponse } from "@/types/auth.types";
import { useState } from "react";

export const useResendOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();
  const [Otp, setOtp] = useState<string | null>();

  const resendOtp = async (data: ResendOtpPayload) => {
    setIsLoading(true);
    setError(null);
    const body = objectToUrlEncoded(data);
    try {
      const response = await fetch("/api/user/resend-otp", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
        body,
      });
      if (!response.ok) {
        throw new HttpError(response);
      }

      const responseData: ResendOtpResponse = await response.json();

      setOtp(responseData.detail.otp.toString());
      setIsLoading(false);
    } catch (error: unknown) {
      const errorMessage = await processError(error);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return { isLoading, error, resendOtp, Otp };
};
