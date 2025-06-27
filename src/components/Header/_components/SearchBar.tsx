"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const SearchBar = ({ className }: React.ComponentProps<"div">) => {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(currentSearch);
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim() == "") return;
    const params = new URLSearchParams(searchParams);
    if (search === "") {
      params.delete("search");
    } else {
      params.set("search", search);
    }

    router.replace({
      pathname: "/restaurants",
      query: Object.fromEntries(params),
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    setSearch("");
    params.delete("search");
    router.replace({
      pathname: "/restaurants",
      query: Object.fromEntries(params),
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex w-full items-center", className)}
    >
      <Search className="text-muted-foreground absolute left-3 z-10 size-5" />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-background dark:bg-secondary w-full rounded-lg pl-10 shadow-none"
        placeholder="Search food, restaurants and more ... "
      />
      {search !== "" && (
        <Button
          size={"icon"}
          variant={"ghost"}
          type="button"
          className="text-muted-foreground absolute right-0 z-20 cursor-pointer"
          onClick={handleClear}
        >
          <X className="text-muted-foreground absolute right-3 z-10 size-5" />
        </Button>
      )}
    </form>
  );
};

export default SearchBar;
