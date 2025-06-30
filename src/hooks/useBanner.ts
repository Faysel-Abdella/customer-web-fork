import { useCallback, useEffect, useState, useTransition } from "react";

import { BannerItem, getBannerItems } from "@/actions/actions";

export function useBanner() {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BannerItem[] | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchBannerData = useCallback(async () => {
    setError(null);

    startTransition(async () => {
      const result = await getBannerItems();
      if (result.error) {
        setError(result.error);
      }
      if (result.data) {
        setData(result.data);
      }
    });
  }, []);

  useEffect(() => {
    fetchBannerData();
  }, [fetchBannerData]);

  return {
    data,
    isPending,
    error,
  };
}
