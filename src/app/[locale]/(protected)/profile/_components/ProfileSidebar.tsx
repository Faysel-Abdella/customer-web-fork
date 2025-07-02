"use client";

import {
  Bell,
  CreditCard,
  HelpCircle,
  MapPin,
  ShoppingBag,
  User,
} from "lucide-react";

import LogoutButton from "@/components/Header/_components/LogoutButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Personal Info",
    icon: User,
    id: "personal",
    href: "/profile",
  },
  {
    title: "Addresses",
    icon: MapPin,
    id: "addresses",
    href: "/profile/addresses",
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    id: "orders",
    href: "/profile/orders",
  },
  {
    title: "Payment Methods",
    icon: CreditCard,
    id: "payment",
    href: "/profile/payment-methods",
  },
  {
    title: "Notifications",
    icon: Bell,
    id: "notifications",
    href: "/profile/notifications",
  },

  {
    title: "Help & Support",
    icon: HelpCircle,
    id: "help",
    href: "/profile/help",
  },
];

const ProfileSidebar = () => {
  const pathname = usePathname();
  return (
    <nav className="max-w-72 min-w-72 flex-1 space-y-5 border-r p-4">
      <ul className="space-y-2">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={cn(
                "hover:bg-primary/50 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors duration-200",
                item.href === pathname &&
                  "bg-primary/40 border-primary border-r-4",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Separator />
      <div className="w-full">
        <LogoutButton>
          <Button variant={"outline"} className="w-full">
            Logout
          </Button>
        </LogoutButton>
      </div>
    </nav>
  );
};

export default ProfileSidebar;
