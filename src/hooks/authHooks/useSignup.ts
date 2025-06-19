import { useState } from "react";

import { useRouter } from "@/i18n/navigation";
import { HttpError } from "@/lib/api/HttpError";
import { objectToUrlEncoded, processError } from "@/lib/utils";
import { LoginResponse, SignupPayload } from "@/types/auth.types";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();
  const router = useRouter();
  const [Otp, setOtp] = useState<string | null>();

  const signup = async (data: SignupPayload) => {
    setIsLoading(true);
    setError(null);
    const body = objectToUrlEncoded(data);
    try {
      const response = await fetch("/api/user/signup", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
        body,
      });
      if (!response.ok) {
        throw new HttpError(response);
      }

      const responseData: LoginResponse = await response.json();

      console.log("✅ Login successful", responseData);

      const unVerifiedUser = {
        country_code: responseData.detail.country_code,
        contact_no: responseData.detail.contact_no,
      };

      localStorage.setItem("unVerifiedUser", JSON.stringify(unVerifiedUser));
      setOtp(responseData.detail.otp.toString());

      setIsLoading(false);
      router.push("/verify-otp");
    } catch (error) {
      const errorMessage = await processError(error);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    signup,
    error,
    Otp,
  };
};
