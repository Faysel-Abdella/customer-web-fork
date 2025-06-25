"use client";
import LanguageSelector from "@/components/LanguageSelector";
import UnAuthUserPopover from "@/components/UnAuthUserPopover";
import { UserDetail } from "@/types/auth.types";

import { CartSheet } from "./CartSheet";
import { NotificationPopover } from "./NotificationPopover";
import { HeaderThemeToggle } from "./ThemeToggle";
import { UserDropdown } from "./UserDropdown";

interface AccountMenuProps {
  user?: UserDetail;
}
const AccountMenu = ({ user }: AccountMenuProps) => {
  if (user)
    return (
      <div className="flex items-center gap-4 md:gap-5">
        <LanguageSelector className="max-lg:hidden" />
        <HeaderThemeToggle className="max-lg:hidden" />
        <NotificationPopover />

        <CartSheet />
        <UserDropdown className="max-lg:hidden" />
      </div>
    );
  return (
    <div className="flex items-center gap-4 md:gap-5">
      <LanguageSelector className="max-lg:hidden" />
      <HeaderThemeToggle className="max-lg:hidden" />
      <CartSheet />
      <UnAuthUserPopover className="max-lg:hidden" />
    </div>
  );
};

export default AccountMenu;
