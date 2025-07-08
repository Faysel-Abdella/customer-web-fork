import { useState, useTransition } from "react";

import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";

import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase"; // Import your initialized auth service
import { HttpError } from "@/lib/HttpError";
import { processError } from "@/lib/utils";
import { LoginResponse, UserDetail } from "@/types/auth.types";

export function useSocialSSO({
  providerName,
}: {
  providerName: "google" | "facebook";
}) {
  const [error, setError] = useState<null | string>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<UserDetail>();
  const { login: contextLogin } = useAuth();
  const [isLoading, startTransition] = useTransition();

  const login = async () => {
    setIsSuccess(false);
    setError(null);

    const provider =
      providerName == "google"
        ? new GoogleAuthProvider()
        : new FacebookAuthProvider();

    try {
      startTransition(async () => {
        const result = await signInWithPopup(auth, provider);
        const user: User = result.user;

        const userId = user.providerData[0]?.uid || user.uid;

        const uuid = crypto.randomUUID();

        const socialLoginPayload = {
          HaLogin: {
            user_id: userId,
            login_provider: providerName,
            role_id: "2",
            email: user.email || "",
            full_name: user.displayName || "",
            image_url: user.photoURL || "",
            device_type: "WEB",
            device_token: uuid,
            device_udid: uuid,
          },
        };

        const body = JSON.stringify(socialLoginPayload);

        const response = await fetch("/api/user/social-login", {
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log("error");
          throw new HttpError(response);
        }

        const responseData: LoginResponse = await response.json();

        console.log("✅ Login successful");
        contextLogin(responseData.detail);
        setUser(responseData.detail);
        setIsSuccess(true);
      });
    } catch (error) {
      const errorMessage = await processError(error);
      setError(errorMessage);
    }
  };

  return { login, isSuccess, isLoading, error, user };
}
