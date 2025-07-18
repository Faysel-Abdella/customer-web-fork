"use client";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { MapPin, Phone } from "lucide-react";

import { Restaurant } from "@/types/restaurant.types";

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const formateHHMM = (date?: string) => {
  if (!date) return;

  return format(new Date(date), "hh:MM aa");
};
const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  const descriptionHtml = restaurant.description;

  const sanitizedDescription = DOMPurify.sanitize(descriptionHtml, {
    USE_PROFILES: { html: true },
  });
  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-4">
        <p className="mb-6 text-lg font-semibold">Restaurant Information</p>
        <p className="font-bold">About</p>
        <p dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      </div>
      <div>
        <p className="mb-2 font-semibold">Contact Information</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin size={24} strokeWidth={1} />
            <div>
              <p className="font-medium">{restaurant.location}</p>
              <p className="text-muted-foreground">Address</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={24} strokeWidth={1} />
            <div>
              <p className="font-medium">{restaurant.contact_no}</p>
              <p className="text-muted-foreground">Mobile</p>
            </div>
            <p></p>
          </div>
        </div>
      </div>
      <div>
        <p className="mb-6 text-xl font-semibold">Availability</p>
        <div className="space-y-4">
          {restaurant.availability.map((availability) => (
            <div
              key={availability.id}
              className="border-border bg-secondary dark:bg-card flex items-center justify-between rounded-md border p-2 px-4"
            >
              <p>{days[availability.day_id]}</p>
              <div className="flex items-center gap-2">
                <p>{formateHHMM(availability.start_time)}</p>
                <span>-</span>
                <p>{formateHHMM(availability.end_time)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
