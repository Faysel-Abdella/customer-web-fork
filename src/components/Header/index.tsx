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
    <div className="bg-background fixed top-0 z-50 flex w-full flex-col items-center justify-center gap-5 overflow-hidden border-b px-5 py-4 shadow-sm md:px-5 lg:px-10 xl:px-20">
      <div className="flex w-full items-center justify-between gap-10">
        <div className="flex items-center gap-2">
          <MobileSheet />
          <Logo href={user ? "/home" : "/"} />
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
