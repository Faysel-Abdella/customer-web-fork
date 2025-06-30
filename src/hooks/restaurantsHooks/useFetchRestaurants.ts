"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { getRestaurants } from "@/actions/restaurants.actions";
import { Restaurant } from "@/types/restaurant.types";

export function useFetchRestaurants() {
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Restaurant[] | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const queryString = searchParams.toString();

    startTransition(async () => {
      setError(null);
      const result = await getRestaurants(queryString);

      if (result.error) {
        setError(result.error);
        setData(null);
      } else if (result.data) {
        setData(result.data);
      }
    });
  }, [searchParams]);

  return {
    data,
    isPending,
    error,
  };
}
