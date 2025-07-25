"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const SearchBar = ({ className, ...props }: React.ComponentProps<"form">) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("header");

  const currentSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(currentSearch);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch === currentSearch) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    router.replace({
      pathname: "/restaurants",
      query: Object.fromEntries(params),
    });
  }, [debouncedSearch, currentSearch, router, searchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleClear = () => {
    setSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex w-full items-center", className)}
      {...props}
    >
      <Search className="text-muted-foreground absolute left-3 z-10 size-5" />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-background dark:bg-secondary w-full rounded-lg pl-10 shadow-none"
        placeholder={t("search_placeholder")}
      />
      {search && (
        <Button
          size={"icon"}
          variant={"ghost"}
          type="button"
          className="text-muted-foreground absolute right-0 z-20 cursor-pointer"
          onClick={handleClear}
        >
          <X className="size-5" />
        </Button>
      )}
    </form>
  );
};

export default SearchBar;
