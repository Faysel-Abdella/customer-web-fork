import { useCallback, useEffect, useState } from "react";

import { getCategiesList } from "@/actions/actions";
import { Category } from "@/types/restaurant.types";

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const fetchCategories = useCallback(async () => {
    setisLoading(true);
    const { data, success } = await getCategiesList();
    if (success && data) {
      setIsSuccess(true);
      setCategories(data);
    } else {
      setIsSuccess(false);
    }
    setisLoading(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    isSuccess,
  };
};

export default useCategories;
