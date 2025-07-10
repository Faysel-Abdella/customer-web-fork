"use client";
import React, { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import LanguageSelector from "@/components/LanguageSelector";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import UnAuthUserPopover from "@/components/UnAuthUserPopover";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import MobileSheet from "./MobileSheet";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("header");

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
        <Link href={"/"} className="flex items-center gap-2">
          <Logo className="size-10 border-0 lg:size-12" />
          <p className="hover:text-primary text-2xl font-bold md:text-3xl lg:text-4xl">
            TIME
          </p>
        </Link>
      </div>
      <div className="flex w-1/3 items-center justify-evenly font-medium max-lg:hidden">
        <Link href={"/restaurants"} className="hover:text-primary">
          {t("restaurants")}2
        </Link>
        <Link href={"/about-us"} className="hover:text-primary">
          {t("about_us")}
        </Link>
        <Link href={"/contact-us"} className="hover:text-primary">
          {t("contact_us")}
        </Link>
      </div>
      <div className="flex items-center justify-center pr-5 lg:w-1/3 lg:gap-8">
        <LanguageSelector className="max-lg:hidden" />
        <ThemeToggle className="dark:hover:bg-secondary/50 hover:bg-secondary/30 border-0 bg-transparent shadow-none max-lg:hidden dark:bg-transparent" />
        <UnAuthUserPopover />
      </div>
    </div>
  );
};

export default Header;
