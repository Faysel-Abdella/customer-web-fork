import { useState } from "react";

import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { HttpError } from "@/lib/api/HttpError";
import { auth } from "@/lib/firebase"; // Import your initialized auth service
import { processError } from "@/lib/utils";
import { LoginResponse, UserDetail } from "@/types/auth.types";

export function useGoogleSSO() {
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
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user: User = result.user;

      console.log("Got user info from Firebase:", user);

      // 2. We now have the user's info directly. Let's build the payload for YOUR backend.
      const backendPayload = new URLSearchParams();

      // The original Google User ID is stored in the providerData
      const googleUserId = user.providerData[0]?.uid || user.uid;

      const uuid = crypto.randomUUID();

      // ---- HaLogin Fields ----
      backendPayload.append("HaLogin[user_id]", googleUserId);
      backendPayload.append("HaLogin[login_provider]", "google");
      backendPayload.append("HaLogin[role_id]", "2");
      backendPayload.append("HaLogin[merchant_id]", "2");
      backendPayload.append("HaLogin[email]", user.email || "");
      backendPayload.append("HaLogin[full_name]", user.displayName || "");
      backendPayload.append("HaLogin[image_url]", user.photoURL || "");
      backendPayload.append("HaLogin[device_type]", "1");
      backendPayload.append("HaLogin[device_token]", uuid);
      backendPayload.append("HaLogin[device_udid]", uuid);

      // 3. Send the formatted data to your backend API
      const yourApiUrl = "/api/user/social-login"; // Your proxied endpoint

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
      contextLogin(responseData.detail, responseData["access-token"]);
      setUser(responseData.detail);
      setIsLoading(false);
      setIsSuccess(true);
      router.push("/dashboard");
    } catch (error) {
      const errorMessage = await processError(error);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return { login, isSuccess, isLoading, error, user };
}
