"use client";

import { useTranslations } from "next-intl";

import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "@/i18n/navigation";

import AccountMenu from "./_components/AccountMenu";
import MobileSheet from "./_components/MobileSheet";
import SearchBar from "./_components/SearchBar";

const Header = () => {
  const { user } = useAuth();
  const t = useTranslations("header");
  return (
    <div className="bg-background fixed top-0 z-50 flex h-32 w-full flex-col items-center justify-center gap-5 overflow-hidden border-b from-orange-200 via-orange-300 to-red-200 px-5 shadow-sm md:px-10 lg:h-24 dark:from-orange-600 dark:via-orange-700 dark:to-red-600">
      <div className="flex w-full items-center justify-between gap-10">
        <div className="flex items-center gap-4">
          <MobileSheet />
          <Link href={user ? "/home" : "/"} className="flex items-center gap-2">
            <Logo className="size-10 border-0 lg:size-12" />
            <p className="hover:text-primary text-2xl font-bold md:text-3xl lg:text-4xl">
              TIME
            </p>
          </Link>
        </div>
        <Link
          href="/restaurants"
          className="hover:text-primary font-medium max-lg:hidden"
        >
          {t("restaurants")}
        </Link>
        <SearchBar className="max-lg:hidden" />
        <AccountMenu user={user!} />
      </div>
      <SearchBar className="lg:hidden" />
    </div>
  );
};

export default Header;
