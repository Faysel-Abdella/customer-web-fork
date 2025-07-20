import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Availability } from "@/types/restaurant.types";

interface AvailabilityModalProps {
  availability: Availability[];
}
const formateHHMM = (date?: string) => {
  if (!date) return;

  return format(new Date(date), "hh:MM aa");
};
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
function getTodayIndex() {
  const today = new Date();
  const day = today.getDay();
  return day === 0 ? 7 : day;
}
const AvailabilityModal = ({ availability }: AvailabilityModalProps) => {
  const today = getTodayIndex();
  const currentDayAvailabilty = availability.find(
    (day) => day.day_id === today - 1,
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className="w-fit cursor-pointer rounded-full border"
        >
          {currentDayAvailabilty ? (
            <>
              <div className="size-1.5 rounded-full bg-green-500" />
              <span className="text-muted-foreground max-sm:hidden">
                Accepting orders from
              </span>
              <span className="text-muted-foreground sm:hidden">Open from</span>
              <span className="font-semibold">
                {formateHHMM(currentDayAvailabilty.start_time)}
                <span> to </span>
                {formateHHMM(currentDayAvailabilty.end_time)}
              </span>
            </>
          ) : (
            "Closed"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Availability</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Here are the our working hours
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {availability.map((day, index) => (
            <div
              key={day.id}
              className={cn(
                "text-secondary-foreground flex items-center justify-between py-2",
                index < availability.length - 1 && "border-b",
              )}
            >
              <p>{days[day.day_id]}</p>
              <div className="flex items-center gap-2 font-medium">
                <p>{formateHHMM(day.start_time)}</p>
                <span>-</span>
                <p>{formateHHMM(day.end_time)}</p>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <Button type="button" className="w-full font-semibold">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvailabilityModal;
