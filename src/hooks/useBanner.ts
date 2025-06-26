import { useCallback, useEffect, useState } from "react";

import { HttpError } from "@/lib/api/HttpError";
import { processError } from "@/lib/utils";

interface BannerData {
  list: {
    id: number;
    name: string;
    url: string;
  }[];
}

export function useBanner() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BannerData | null>(null);

  const fetchBannerData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Unauthorized: No access token found.");
      }

      const res = await fetch("/api/item-detail/banner-images", {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new HttpError(res);
      }

      const responseData: BannerData = await res.json();
      setData(responseData);
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
  }, []);

  useEffect(() => {
    fetchBannerData();
  }, [fetchBannerData]);

  return {
    data,
    isLoading,
    error,
  };
}
