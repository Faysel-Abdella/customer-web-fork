import Logo from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AccountMenu from "./_components/AccountMenu";

const Header = () => {
  return (
    <div className='w-full flex items-center justify-between h-16 gap-16 bg-background px-10 border-b'>
      <div className='flex gap-2 items-center justify-center'>
        <Logo className='size-11 ' />
        <div className='flex flex-col gap-0  justify-center'>
          <p className='text-lg font-bold text-primary'>Time Delivery</p>
          <p className=' text-muted-foreground text-sm text-nowrap'>
            The right food, right on time
          </p>
        </div>
      </div>
      <div className=' w-full flex relative  items-center'>
        <Search className='text-muted-foreground size-5 -mr-8' />
        <Input
          className=' w-full rounded-full shadow-none pl-10'
          placeholder='Search food, restaurants and more ... '
        />
      </div>
      <AccountMenu />
    </div>
  );
};

export default Header;
