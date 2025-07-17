import FadingDivider from "@/components/FadingDivider";
import { Restaurant } from "@/types/restaurant.types";

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}
const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  return (
    <>
      <div className="flex w-full items-center justify-between py-6 pt-3">
        <div>
          <p className="text-3xl font-semibold">{restaurant.title}</p>
        </div>
        <div className="flex items-center gap-7">
          <div className="flex flex-col items-end">
            <p className="text-muted-foreground text-sm">Location</p>
            <p className="font-medium">{restaurant.location}</p>
          </div>
          <div className="bg-border h-8 w-px" />
          <div className="flex flex-col items-end">
            <p className="text-muted-foreground text-sm">Earliest arrival</p>
            <p className="font-medium">{restaurant.estimated_delivery_time}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <FadingDivider className="to-border" />
        <FadingDivider className="from-border" />
      </div>
    </>
  );
};

export default RestaurantHeader;
