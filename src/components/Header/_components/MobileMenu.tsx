import UnAuthUserPopover from "@/components/UnAuthUserPopover";
import { UserDetail } from "@/types/auth.types";

import { HeaderThemeToggle } from "./ThemeToggle";
import { UserDropdown } from "./UserDropdown";

interface MobileMenuProps {
  user?: UserDetail;
}
const MobileMenu = ({ user }: MobileMenuProps) => {
  return (
    <div className="flex items-center gap-2 lg:hidden">
      {user ? (
        <>
          <HeaderThemeToggle />
          <UserDropdown />
        </>
      ) : (
        <>
          <HeaderThemeToggle />
          <UnAuthUserPopover />
        </>
      )}
    </div>
  );
};

export default MobileMenu;
