"use client";
import React, { useEffect, useState } from "react";

import LanguageSelector from "@/components/language-selector";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/theme-toggle";
import UnAuthUserPopover from "@/components/UnAuthUserPopover";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import MobileSheet from "./MobileSheet";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={cn(
        "fixed top-0 z-50 flex h-20 w-full justify-between border-b-0 bg-transparent text-white transition-all duration-300",
        isScrolled && "bg-background text-foreground border-b",
      )}
    >
      <div className="flex w-1/3 items-center gap-2 pl-5 md:pl-10 lg:pl-32">
        <MobileSheet />
        <div className="flex items-center gap-2">
          <Logo className="size-10 border-0 lg:size-12" />
          <p className="hover:text-primary text-2xl font-bold md:text-3xl lg:text-4xl">
            TIME
          </p>
        </div>
      </div>
      <div className="flex w-1/3 items-center justify-evenly font-medium max-lg:hidden">
        <Link href={"#"} className="hover:text-primary">
          Restaurants
        </Link>
        <Link href={"#"} className="hover:text-primary">
          Abouts us
        </Link>
        <Link href={"#"} className="hover:text-primary">
          Contact us
        </Link>
      </div>
      <div className="flex items-center justify-center pr-5 lg:w-1/3 lg:gap-8">
        <LanguageSelector className="max-lg:hidden" />
        <ThemeToggle className="border-0 bg-transparent shadow-none max-lg:hidden" />
        <UnAuthUserPopover />
      </div>
    </div>
  );
};

export default Header;
