"use client";
import LanguageSelector from "@/components/LanguageSelector";
import UnAuthUserPopover from "@/components/UnAuthUserPopover";
import { useAuth } from "@/contexts/AuthContext";

import { CartSheet } from "./CartSheet";
import { NotificationPopover } from "./NotificationPopover";
import { HeaderThemeToggle } from "./ThemeToggle";
import UserDropdown from "./UserDropdown";

const AccountMenu = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-10 items-center gap-2 md:gap-5">
        <div className="bg-muted h-9 w-24 animate-pulse rounded-md max-lg:hidden" />
        <div className="bg-muted h-10 w-10 animate-pulse rounded-full max-lg:hidden" />
        <div className="bg-muted h-10 w-10 animate-pulse rounded-full max-lg:hidden" />
        <div className="bg-muted h-10 w-10 animate-pulse rounded-full" />
        <div className="bg-muted h-10 w-10 animate-pulse rounded-full" />
      </div>
    );
  }

  if (isAuthenticated)
    return (
      <div className="flex items-center gap-2 md:gap-5">
        <LanguageSelector className="max-lg:hidden" />
        <HeaderThemeToggle className="max-lg:hidden" />
        <NotificationPopover />
        <CartSheet />
        <UserDropdown className="max-lg:hidden" />
      </div>
    );

  return (
    <div className="flex items-center gap-2 md:gap-5">
      <LanguageSelector />
      <HeaderThemeToggle className="max-lg:hidden" />
      <UnAuthUserPopover className="max-lg:hidden" />
    </div>
  );
};

export default AccountMenu;
