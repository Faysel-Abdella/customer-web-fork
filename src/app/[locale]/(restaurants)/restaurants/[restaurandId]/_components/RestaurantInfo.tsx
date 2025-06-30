import { format } from "date-fns";
import { MapPin, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

  return format(new Date(date), "hh:MM");
};
const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  return (
    <div className="flex gap-10 max-lg:flex-col">
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Restaurant Information</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-2 font-bold">About</p>

            <p>{restaurant.description}</p>
          </div>
          <Separator />
          <div>
            <p className="mb-2 font-bold">Contact Information</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <p>{restaurant.contact_no}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <p>{restaurant.location}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Availability</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4">
          {restaurant.availability.map((availability) => (
            <div
              key={availability.id}
              className="border-border bg-background flex items-center justify-between rounded-md border p-2 px-4"
            >
              <p>{days[availability.day_id]}</p>
              <div className="flex items-center gap-2">
                <p>{formateHHMM(availability.start_time)}</p>
                <span>-</span>
                <p>{formateHHMM(availability.end_time)}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantInfo;
