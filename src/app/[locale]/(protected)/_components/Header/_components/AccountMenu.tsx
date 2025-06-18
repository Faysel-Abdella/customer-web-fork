import { ReceiptText } from "lucide-react";
import { CartSheet } from "./CartSheet";
import { NotificationPopover } from "./NotificationPopover";
import { UserDropdown } from "./UserDropdown";

const AccountMenu = () => {
  return (
    <div className='flex items-center  gap-5'>
      <NotificationPopover />
      <div className='size-10 rounded-lg border cursor-pointer hover:bg-secondary flex transition-colors justify-center items-center '>
        <ReceiptText size={18} />
      </div>
      <CartSheet />

      <UserDropdown />
    </div>
  );
};

export default AccountMenu;
