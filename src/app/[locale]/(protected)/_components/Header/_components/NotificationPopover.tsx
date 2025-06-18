// src/components/layout/notification-popover.tsx

import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BellIcon, Star, CheckCircle2, Car } from "lucide-react";

// You can define a type for your notifications for type safety
type Notification = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
};

// Mock data - in a real app, you would fetch this from your API
const notifications: Notification[] = [
  {
    id: "1",
    icon: Car,
    title: "Your order is on its way!",
    description: "Your Kitfo from Genet Restaurant will arrive soon.",
  },
  {
    id: "2",
    icon: CheckCircle2,
    title: "Order confirmed",
    description: "We've received your order for Doro Wot.",
  },
  {
    id: "3",
    icon: Star,
    title: "Rate your last meal",
    description: "How was the Tibs from Kategna Restaurant?",
  },
];

export function NotificationPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* The bell icon that triggers the popover */}
        <Button
          variant='ghost'
          size='icon'
          className=' relative size-10 rounded-lg border cursor-pointer hover:bg-secondary flex transition-colors justify-center items-center '
        >
          <BellIcon size={18} />
          {/* Optional: Add a badge for unread notifications */}
          {notifications.length > 0 && (
            <span className='absolute top-0 right-0 flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-sky-500'></span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 md:w-96 p-0'>
        <div className='flex flex-col'>
          {/* Header */}
          <div className='p-4'>
            <h4 className='text-lg font-semibold'>Notifications</h4>
          </div>
          <Separator />

          {/* List of Notifications */}
          <div className='max-h-80 overflow-y-auto p-4 space-y-4'>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.id} className='flex items-start gap-4'>
                  <notification.icon className='h-5 w-5 text-muted-foreground mt-1' />
                  <div className='grid gap-1'>
                    <p className='font-semibold'>{notification.title}</p>
                    <p className='text-sm text-muted-foreground'>
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center text-muted-foreground py-8'>
                <p>You have no new notifications.</p>
              </div>
            )}
          </div>

          {/* Footer Button */}
          <Separator />
          <div className='p-2'>
            <Link href='#' passHref>
              <Button variant='ghost' className='w-full hover:bg-primary'>
                View All Notifications
              </Button>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
