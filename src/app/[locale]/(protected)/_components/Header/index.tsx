import Logo from "@/components/Logo";

import AccountMenu from "./_components/AccountMenu";
import SearchBar from "./_components/SearchBar";

const Header = () => {
  return (
    <div className="flex h-24 w-full items-center justify-between gap-16 overflow-hidden border-b bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 px-10 shadow-2xl dark:from-orange-600 dark:via-orange-700 dark:to-red-600">
      <div className="flex items-center justify-center gap-2">
        <Logo className="size-11" />
        <div className="flex flex-col justify-center gap-0">
          <p className="text-lg font-bold text-white">Time Delivery</p>
          <p className="text-sm text-nowrap text-white/80">
            The right food, right on time
          </p>
        </div>
      </div>
      <SearchBar />
      <AccountMenu />
    </div>
  );
};

export default Header;
