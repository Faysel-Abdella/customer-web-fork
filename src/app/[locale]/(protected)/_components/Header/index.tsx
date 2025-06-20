import Logo from "@/components/Logo";

import AccountMenu from "./_components/AccountMenu";
import SearchBar from "./_components/SearchBar";

const Header = () => {
  return (
    <div className="bg-background flex h-16 w-full items-center justify-between gap-16 border-b px-10">
      <div className="flex items-center justify-center gap-2">
        <Logo className="size-11" />
        <div className="flex flex-col justify-center gap-0">
          <p className="text-primary text-lg font-bold">Time Delivery</p>
          <p className="text-muted-foreground text-sm text-nowrap">
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
