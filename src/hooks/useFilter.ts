import { useSearchParams } from "next/navigation";

import { usePathname, useRouter } from "@/i18n/navigation";

const useFilter = (param: string, defaultValue: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeValue = searchParams.get(param) ?? defaultValue;

  const applyFilters = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === defaultValue) {
      params.delete(param);
    } else {
      params.set(param, value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return {
    applyFilters,
    activeValue,
  };
};

export default useFilter;
