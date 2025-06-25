import { Menu } from "lucide-react";

import LanguageSelector from "@/components/language-selector";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";

const MobileSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="max-sm:w-full">
        <SheetHeader>
          <SheetTitle className="sr-only">mobile navigation sheet</SheetTitle>
          <div className="flex items-center justify-between pr-5">
            <div className="flex items-center gap-2">
              <Logo className="size-10 border-0" />
              <p className="hover:text-primary text-xl font-bold">TIME</p>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-5 px-5 font-medium">
          <Link href={"/restaurants"} className="hover:text-primary">
            Restaurants
          </Link>
          <Link href={"/about-us"} className="hover:text-primary">
            Abouts us
          </Link>
          <Link href={"/contact-us"} className="hover:text-primary">
            Contact us
          </Link>
          <div className="flex w-full flex-col space-y-2">
            <Button asChild>
              <Link href={"/login"}>Login</Link>
            </Button>
            <Button variant={"outline"} className="border-primary" asChild>
              <Link href={"/signup"}>Sign up</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
