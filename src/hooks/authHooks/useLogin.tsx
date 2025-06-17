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
      console.log("✅ Login successful, server response:", responseData.detail);
      setUser(responseData.detail);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      // This catches network failures or the error we threw above
      setError(error);
      console.error("🚨 A critical error occurred:", error);
    }
  };

  return { isLoading, error, login, isSuccess, user };
};
