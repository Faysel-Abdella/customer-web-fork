import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { HttpError } from "@/lib/HttpError";
import { objectToUrlEncoded, processError } from "@/lib/utils";
import {
  LoginResponse,
  UserDetail,
  VerifyOtpPayload,
} from "@/types/auth.types";

export const useVerifyOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<UserDetail>();
  const router = useRouter();
  const { login: contextLogin } = useAuth();

  const verifyOtp = async (data: VerifyOtpPayload) => {
    setIsLoading(true);
    setError(null);
    const body = objectToUrlEncoded(data);
    try {
      const response = await fetch("/api/user/verify-otp", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
        body,
      });
      if (!response.ok) {
        throw new HttpError(response);
      }
      const responseData: LoginResponse = await response.json();
      contextLogin(responseData.detail, responseData["access-token"]);
      localStorage.removeItem("unVerifiedUser");
      setUser(responseData.detail);
      setIsLoading(false);
      setIsSuccess(true);
      router.push("/home");
    } catch (error) {
      const errorMessage = await processError(error);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    verifyOtp,
    error,
    isSuccess,
    user,
  };
};
