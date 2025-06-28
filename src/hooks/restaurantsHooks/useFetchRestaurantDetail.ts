import { useCallback, useEffect, useState } from "react";

import { HttpError } from "@/lib/HttpError";
import { processError } from "@/lib/utils";
import { Restaurant } from "@/types/restaurant.types";

interface RestaurantDetailResponce {
  detail: Restaurant;
}

export function useFetchRestaurantDetail(id: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Restaurant | null>(null);

  const fetchBannerData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Unauthorized: No access token found.");
      }

      const res = await fetch(`/api/restaurant/restaurant-detail?id=${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new HttpError(res);
      }

      const responseData: RestaurantDetailResponce = await res.json();
      setData(responseData.detail);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }
      const errorMessage = await processError(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [id]);

  useEffect(() => {
    fetchBannerData();
  }, [fetchBannerData]);

  return {
    data,
    isLoading,
    error,
  };
}
