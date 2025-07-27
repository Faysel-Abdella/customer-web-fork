// src/components/layout/account-menu.tsx
"use client";

import { Heart, LogOut, ShoppingBag, User2 } from "lucide-react";
import { useTranslations } from "next-intl";

import CustomLink from "@/components/CustomLink";
import LanguageSelector from "@/components/LanguageSelector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

import LogoutButton from "./LogoutButton";

export function UserDropdown({ className }: React.ComponentProps<"button">) {
  const { user } = useAuth();
  const t = useTranslations("header");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "hover:bg-secondary relative flex size-10 cursor-pointer items-center justify-center rounded-lg border transition-colors",
            className,
          )}
        >
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src={user?.profile_file} alt={`@${user?.full_name}`} />
            <AvatarFallback>
              {user?.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">
              {user?.full_name}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.email || `${user?.country_code}${user?.contact_no}`}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="flex w-full items-center justify-between px-2 lg:hidden">
            <Label>Language</Label>
            <LanguageSelector size="sm" className="w-24" />
          </div>
          <DropdownMenuItem asChild>
            <CustomLink href="/profile">
              <User2 className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </CustomLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <CustomLink href="/profile/favourites">
              <Heart className="mr-2 h-4 w-4" />
              <span>Favourites</span>
            </CustomLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <CustomLink href="/profile/orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Orders</span>
            </CustomLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <LogoutButton>
          <Button className="hover:bg-secondary hover:text-secondary-foreground bg-background text-foreground w-full shadow-none">
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("logout")}</span>
          </Button>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
