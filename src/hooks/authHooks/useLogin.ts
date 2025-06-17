import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { objectToUrlEncoded } from "@/lib/utils";
import {
  LoginFormPayload,
  LoginResponse,
  UserDetail,
} from "@/types/auth.types";
import { useState } from "react";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | unknown>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<UserDetail>();
  const router = useRouter();
  const { login: contextLogin } = useAuth();

  const login = async (data: LoginFormPayload) => {
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
        const errorDetails = await response.json().catch(() => response.text());
        console.error("📋 Here is the reason from the server:", errorDetails);
        throw new Error(`Server Error: ${response.status}`);
      }

      const responseData: LoginResponse = await response.json();

      console.log("✅ Login successful");
      contextLogin(responseData.detail, responseData["access-token"]);
      setUser(responseData.detail);
      setIsLoading(false);
      setIsSuccess(true);
      router.push("/dashboard");
    } catch (error) {
      // This catches network failures or the error we threw above
      setIsLoading(false);
      setError(error);
      console.error("🚨 A critical error occurred:", error);
    }
  };

  return { isLoading, error, login, isSuccess, user };
};
