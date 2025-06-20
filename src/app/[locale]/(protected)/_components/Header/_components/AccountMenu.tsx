import { ReceiptText } from "lucide-react";

import { CartSheet } from "./CartSheet";
import HeaderIcon from "./HeaderIcon";
import { NotificationPopover } from "./NotificationPopover";
import { HeaderThemeToggle } from "./ThemeToggle";
import { UserDropdown } from "./UserDropdown";

const AccountMenu = () => {
  return (
    <div className="flex items-center gap-5">
      <HeaderThemeToggle />
      <NotificationPopover />
      <HeaderIcon>
        <ReceiptText size={18} />
      </HeaderIcon>

      <CartSheet />

      <UserDropdown />
    </div>
  );
};

export default AccountMenu;
