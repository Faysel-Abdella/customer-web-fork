import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { HttpError } from "@/lib/api/HttpError";
import { objectToUrlEncoded, processError } from "@/lib/utils";
import { LoginPayload, LoginResponse, UserDetail } from "@/types/auth.types";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<UserDetail>();
  const router = useRouter();
  const { login: contextLogin } = useAuth();

  const login = async (data: LoginPayload) => {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);
    const body = objectToUrlEncoded(data);
    try {
      const response = await fetch("/api/user/login", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
        body,
      });
      if (!response.ok) {
        throw new HttpError(response);
      }

      const responseData: LoginResponse = await response.json();

      console.log("✅ Login successful");
      contextLogin(responseData.detail);
      setUser(responseData.detail);
      setIsLoading(false);
      setIsSuccess(true);
      router.push("/home");
    } catch (error: unknown) {
      const errorMessage = await processError(error);

      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return { isLoading, error, login, isSuccess, user };
};
