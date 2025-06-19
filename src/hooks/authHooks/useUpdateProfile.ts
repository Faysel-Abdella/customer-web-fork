import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { HttpError } from "@/lib/api/HttpError";
import { objectToUrlEncoded, processError } from "@/lib/utils";
import { LoginResponse, UpdateProfilePayload } from "@/types/auth.types";

export const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();
  const router = useRouter();
  const { login: contextLogin } = useAuth();

  const updateProfile = async (data: UpdateProfilePayload) => {
    setIsLoading(true);
    setError(null);
    const body = objectToUrlEncoded(data);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw Error("Unauthorized");
      }

      const response = await fetch("/api/user/profile-update", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body,
      });
      if (!response.ok) {
        throw new HttpError(response);
      }
      const responseData: LoginResponse = await response.json();
      contextLogin(responseData.detail, responseData["access-token"]);
      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      const errorMessage = await processError(error);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    updateProfile,
    error,
  };
};
