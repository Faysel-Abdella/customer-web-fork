"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SearchBar = ({ className }: React.ComponentProps<"div">) => {
  const t = useTranslations("header");
  return (
    <div className={cn("relative flex w-full items-center", className)}>
      <Search className="text-muted-foreground absolute left-3 z-10 size-5" />
      <Input
        className="bg-background dark:bg-secondary w-full rounded-lg pl-10 shadow-none"
        placeholder={t("search_placeholder")}
      />
    </div>
  );
};

export default SearchBar;
