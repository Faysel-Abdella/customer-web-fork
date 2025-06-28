import { useRouter } from "@/i18n/navigation";

export function useFilterRestaurants() {
  const router = useRouter();
  const handleFilter = (key: string, value: string, defaultValue: string) => {
    const params = new URLSearchParams();
    if (defaultValue === value) {
      params.delete(key);
      router.replace({
        pathname: "/restaurants",
        query: Object.fromEntries(params),
      });
    } else {
      params.set(key, value);
      router.replace({
        pathname: "/restaurants",
        query: Object.fromEntries(params),
      });
    }

    router.replace({
      pathname: "/restaurants",
      query: Object.fromEntries(params),
    });
  };

  return {
    handleFilter,
  };
}
