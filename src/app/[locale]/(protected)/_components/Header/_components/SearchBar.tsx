"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="relative flex w-full items-center">
      <Search className="text-muted-foreground -mr-8 size-5" />
      <Input
        className="w-full rounded-full pl-10 shadow-none"
        placeholder="Search food, restaurants and more ... "
      />
    </div>
  );
};

export default SearchBar;
