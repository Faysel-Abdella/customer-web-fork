import React from "react";

import {
  Bell,
  CreditCard,
  HelpCircle,
  MapPin,
  Settings,
  Shield,
  ShoppingBag,
  User,
} from "lucide-react";

import { Link } from "@/i18n/navigation";

const navigationItems = [
  {
    title: "Personal Info",
    icon: User,
    id: "personal",
  },
  {
    title: "Addresses",
    icon: MapPin,
    id: "addresses",
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    id: "orders",
  },
  {
    title: "Payment Methods",
    icon: CreditCard,
    id: "payment",
  },
  {
    title: "Notifications",
    icon: Bell,
    id: "notifications",
  },
  {
    title: "Security",
    icon: Shield,
    id: "security",
  },
  {
    title: "Settings",
    icon: Settings,
    id: "settings",
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    id: "help",
  },
];

const ProfileSidebar = () => {
  return (
    <nav className="max-w-72 min-w-72 flex-1 border-r p-4">
      <ul className="space-y-2">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <Link
              href={`/profile/${item.id}`}
              className={`hover:bg-primary/50 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors duration-200`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProfileSidebar;
