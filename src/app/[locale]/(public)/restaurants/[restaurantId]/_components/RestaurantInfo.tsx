"use client";
import DOMPurify from "dompurify";
import { MapPin, Phone } from "lucide-react";

import { Restaurant } from "@/types/restaurant.types";

import AvailabilityModal from "./AvailabilityModal";

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

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
      <AvailabilityModal availability={restaurant.availability} />
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
    </div>
  );
};

export default RestaurantInfo;
