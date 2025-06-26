import { useState } from "react";

import { updateProfileAction } from "@/actions/actions";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { objectToFormData } from "@/lib/utils";
import { UpdateProfilePayload } from "@/types/auth.types";

export const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();
  const router = useRouter();
  const { login: contextLogin } = useAuth();

  const updateProfile = async (data: UpdateProfilePayload) => {
    setIsLoading(true);
    setError(null);
    const body = objectToFormData(data);
    const result = await updateProfileAction(body);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result.data) {
      setIsLoading(false);
      contextLogin(result.data.detail);
      router.push("/home");
    }
  };

  return {
    isLoading,
    updateProfile,
    error,
  };
};
