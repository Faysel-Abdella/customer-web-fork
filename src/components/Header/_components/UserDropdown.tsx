// src/components/layout/account-menu.tsx
"use client";
import Link from "next/link";

import { Heart, LogOut, Settings, Wallet } from "lucide-react";

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
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

import LogoutButton from "./LogoutButton";

export function UserDropdown({ className }: React.ComponentProps<"button">) {
  const { user } = useAuth();
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
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard/settings" passHref>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/wallet" passHref>
            <DropdownMenuItem>
              <Wallet className="mr-2 h-4 w-4" />
              <span>Wallet</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/favorites" passHref>
            <DropdownMenuItem>
              <Heart className="mr-2 h-4 w-4" />
              <span>Favorites</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <LogoutButton>
          <Button className="hover:bg-secondary hover:text-secondary-foreground bg-background text-foreground w-full shadow-none">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Button>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
