"use client";
import { Menu } from "lucide-react";

import LanguageSelector from "@/components/language-selector";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "@/i18n/navigation";

import LogoutButton from "./LogoutButton";

const MobileSheet = () => {
  const { user } = useAuth();
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
        {!user && (
          <div className="flex flex-col gap-5 px-5 font-medium">
            <Link href={"#"} className="hover:text-primary">
              Restaurants
            </Link>
            <Link href={"#"} className="hover:text-primary">
              Abouts us
            </Link>
            <Link href={"#"} className="hover:text-primary">
              Contact us
            </Link>
            <div className="flex w-full flex-col space-y-2">
              <Button>Login</Button>
              <Button variant={"outline"} className="border-primary">
                Sign up
              </Button>
            </div>
          </div>
        )}
        {user && (
          <>
            <div className="flex flex-col gap-5 px-5 font-medium">
              <Link href={"#"} className="hover:text-primary">
                Restaurants
              </Link>
              <Link href={"#"} className="hover:text-primary">
                Offers
              </Link>
              <Link href={"#"} className="hover:text-primary">
                Orders
              </Link>
              <Link href={"#"} className="hover:text-primary">
                Profile
              </Link>
            </div>
            <SheetFooter>
              <LogoutButton />
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
