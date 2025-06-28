"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { HttpError } from "@/lib/api/HttpError";
import { processError } from "@/lib/utils";
import { CartItem, Restaurant } from "@/types/restaurant.types";

interface CartItemResponse {
  list: CartItem[];
}

export function useFetchRestaurants() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CartItem[] | null>(null);

  const fetchCartItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Unauthorized: No access token found.");
      }

      const res = await fetch(`/api/cart/my-cart-list`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) {
        throw new HttpError(res);
      }

      const responseData: CartItemResponse = await res.json();
      setData(responseData.list);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }
      const errorMessage = await processError(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchCartItems,
  };
}
