"use client";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

import LanguageSelector from "@/components/LanguageSelector";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
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
  const t = useTranslations("header");
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="max-sm:w-full">
        <SheetHeader>
          <SheetTitle className="sr-only">mobile navigation sheet</SheetTitle>
          <div className="flex items-center justify-between pr-5">
            <Logo href="#" />

            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </SheetHeader>
        {!user && (
          <div className="flex flex-col gap-5 px-5 font-medium">
            <Link href={"/restaurants"} className="hover:text-primary">
              {t("restaurants")}
            </Link>
            <Link href={"/about-us"} className="hover:text-primary">
              {t("about_us")}
            </Link>
            <Link href={"/contact-us"} className="hover:text-primary">
              {t("contact_us")}
            </Link>
            <div className="flex w-full flex-col space-y-2">
              <Button asChild>
                <Link href={"/login"}>{t("login")}</Link>
              </Button>
              <Button variant={"outline"} className="border-primary" asChild>
                <Link href={"/signup"}>{t("signup")}</Link>
              </Button>
            </div>
          </div>
        )}
        {user && (
          <>
            <div className="flex flex-col gap-5 px-5 font-medium">
              <Link href={"/restaurants"} className="hover:text-primary">
                {t("restaurants")}
              </Link>
              <Link href={"/profile/favorites"} className="hover:text-primary">
                Favorites
              </Link>
              <Link href={"/profile/order"} className="hover:text-primary">
                {t("orders")}
              </Link>
              <Link href={"/profile"} className="hover:text-primary">
                {t("profile")}
              </Link>
            </div>
            <SheetFooter>
              <LogoutButton>
                <Button>{t("logout")}</Button>
              </LogoutButton>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
