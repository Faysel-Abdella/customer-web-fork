import { useState } from "react";

import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { HttpError } from "@/lib/HttpError";
import { auth } from "@/lib/firebase"; // Import your initialized auth service
import { processError } from "@/lib/utils";
import { LoginResponse, UserDetail } from "@/types/auth.types";

export function useSocialSSO({
  providerName,
}: {
  providerName: "google" | "facebook";
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<UserDetail>();
  const router = useRouter();
  const { login: contextLogin } = useAuth();

  const login = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    const provider =
      providerName == "google"
        ? new GoogleAuthProvider()
        : new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user: User = result.user;

      const backendPayload = new URLSearchParams();

      const userId = user.providerData[0]?.uid || user.uid;

      const uuid = crypto.randomUUID();

      backendPayload.append("HaLogin[user_id]", userId);
      backendPayload.append("HaLogin[login_provider]", providerName);
      backendPayload.append("HaLogin[role_id]", "2");
      backendPayload.append("HaLogin[email]", user.email || "");
      backendPayload.append("HaLogin[full_name]", user.displayName || "");
      backendPayload.append("HaLogin[image_url]", user.photoURL || "");
      backendPayload.append("HaLogin[device_type]", "WEB");
      backendPayload.append("HaLogin[device_token]", uuid);
      backendPayload.append("HaLogin[device_udid]", uuid);

      const yourApiUrl = "/api/user/social-login";

      const response = await fetch(yourApiUrl, {
        method: "POST",
        body: backendPayload,
      });

      if (!response.ok) {
        console.log("error");
        throw new HttpError(response);
      }

      const responseData: LoginResponse = await response.json();

      console.log("✅ Login successful");
      contextLogin(responseData.detail);
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

  return { login, isSuccess, isLoading, error, user };
}
