"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { HttpError } from "@/lib/api/HttpError";
import { processError } from "@/lib/utils";
import { Restaurant } from "@/types/restaurant.types";

interface RestaurantResponce {
  list: Restaurant[];
}

export function useFetchRestaurants() {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Restaurant[] | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();

    const fetchRestaurants = async () => {
      const queryString = searchParams.toString();
      const url =
        queryString === ""
          ? "/api/restaurant/restaurant-list"
          : `/api/state/search-restaurant?${queryString}`;

      setError(null);

      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Unauthorized: No access token found.");
        }

        const res = await fetch(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new HttpError(res);
        }

        const responseData: RestaurantResponce = await res.json();
        setData(responseData.list);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          console.log("Fetch aborted");
          return;
        }
        const errorMessage = await processError(err);
        setError(errorMessage);
        setIsLoading(false);
      } finally {
      }
    };

    fetchRestaurants();

    return () => {
      controller.abort();
    };
  }, [searchParams]);

  return {
    data,
    isLoading,
    error,
  };
}
