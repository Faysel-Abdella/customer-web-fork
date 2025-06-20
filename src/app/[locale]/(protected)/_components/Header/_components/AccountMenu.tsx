import { ReceiptText } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";

import { CartSheet } from "./CartSheet";
import { NotificationPopover } from "./NotificationPopover";
import { UserDropdown } from "./UserDropdown";

const AccountMenu = () => {
  return (
    <div className="flex items-center gap-5">
      <ThemeToggle />
      <NotificationPopover />
      <div className="hover:bg-secondary flex size-10 cursor-pointer items-center justify-center rounded-lg border transition-colors">
        <ReceiptText size={18} />
      </div>
      <CartSheet />

      <UserDropdown />
    </div>
  );
};

export default AccountMenu;
