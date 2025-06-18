import { useRouter } from "@/i18n/navigation";
import { objectToUrlEncoded } from "@/lib/utils";
import { LoginResponse, SignupPayload } from "@/types/auth.types";
import { useState } from "react";
import { toast } from "sonner";

export const useProfileSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | unknown>();
  const router = useRouter();

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
        console.log(response);
        const errorDetails = await response.json().catch(() => response.text());
        console.error("📋 Here is the reason from the server:", errorDetails);
        throw new Error(`Server Error: ${response.status}`);
      }

      const responseData: LoginResponse = await response.json();

      console.log("✅ Login successful", responseData);

      const unVerifiedUser = {
        country_code: responseData.detail.country_code,
        contact_no: responseData.detail.contact_no,
      };

      localStorage.setItem("unVerifiedUser", JSON.stringify(unVerifiedUser));

      toast.message("Here is your OTP", {
        description: responseData.detail.otp,
      });
      setIsLoading(false);
      router.push("/verify-otp");
    } catch (error) {
      // This catches network failures or the error we threw above
      setIsLoading(false);
      setError(error);
      console.error("🚨 A critical error occurred:", error);
    }
  };

  return {
    isLoading,
    signup,
    error,
  };
};
