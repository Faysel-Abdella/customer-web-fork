import UnAuthUserPopover from "@/components/UnAuthUserPopover";

import { HeaderThemeToggle } from "./ThemeToggle";
import UserDropdown from "./UserDropdown";

interface MobileMenuProps {
  isAuthenticated?: boolean;
  isLoading?: boolean;
}
const MobileMenu = ({ isAuthenticated, isLoading }: MobileMenuProps) => {
  return (
    <div className="flex items-center gap-2 lg:hidden">
      {isLoading ? (
        <>
          <div className="bg-muted h-10 w-10 animate-pulse rounded-full" />
          <div className="bg-muted h-10 w-10 animate-pulse rounded-full" />
        </>
      ) : isAuthenticated ? (
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
