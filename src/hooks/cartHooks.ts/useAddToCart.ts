import { useState } from "react";

import { HttpError } from "@/lib/HttpError";
import { objectToFormData, processError } from "@/lib/utils";
import { AddToCartRequest } from "@/types/restaurant.types";

export function useAddToCart() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToCart = async (data: AddToCartRequest) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const controller = new AbortController();
    const body = objectToFormData(data);

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Unauthorized: No access token found.");
      }
      const res = await fetch(`/api/cart/add-to-cart`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body,
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new HttpError(res);
      }

      setIsSuccess(true);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }
      const errorMessage = await processError(err);
      setError(errorMessage);
    }

    return () => {
      controller.abort();
    };
  };

  return {
    isSuccess,
    isLoading,
    error,
    addToCart,
  };
}
