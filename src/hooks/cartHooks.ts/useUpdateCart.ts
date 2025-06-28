import { useState } from "react";

import { HttpError } from "@/lib/HttpError";
import { processError } from "@/lib/utils";

const useUpdateCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCart = async (id: string, quantity: string) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const controller = new AbortController();

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Unauthorized: No access token found.");
      }
      const res = await fetch(
        `/api/cart/update-item?id=${id}&quantity=${quantity}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          signal: controller.signal,
        },
      );

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
      setIsLoading(false);
    }

    return () => {
      controller.abort();
    };
  };

  return {
    isSuccess,
    isLoading,
    error,
    updateCart,
  };
};

export default useUpdateCart;
