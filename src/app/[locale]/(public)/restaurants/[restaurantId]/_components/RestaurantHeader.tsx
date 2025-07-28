import FadingDivider from "@/components/FadingDivider";
import { Restaurant } from "@/types/restaurant.types";

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}
const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  return (
    <>
      <div className="flex w-full items-center justify-between gap-5 py-6 pt-3 max-md:flex-col">
        <div className="flex">
          <p className="text-3xl font-semibold">{restaurant.title}</p>
        </div>
        <div className="flex items-stretch gap-3 md:items-center md:gap-7">
          <div className="flex h-full flex-col items-center justify-start max-md:gap-2 md:items-end">
            <p className="text-muted-foreground text-sm max-md:text-center max-md:text-xs">
              <span className="max-sm:hidden">Earliest Time of arrival</span>
              <span className="sm:hidden">Est. time of arrival</span>
            </p>
            <p className="font-medium max-md:text-sm">
              {restaurant.estimated_delivery_time || "N/A"}
            </p>
          </div>
          <div className="flex h-16 w-fit max-w-px flex-1 items-center">
            <div className="bg-border h-8 w-px" />
          </div>
          <div className="flex h-full flex-col items-center justify-start max-md:gap-2 md:items-end">
            <p className="text-muted-foreground text-sm max-sm:text-xs">
              Location
            </p>
            <p className="font-medium max-md:text-sm">
              {restaurant.location || "N/A"}
            </p>
          </div>
          <div className="flex h-16 w-fit max-w-px flex-1 items-center">
            <div className="bg-border h-8 w-px" />
          </div>{" "}
          <div className="flex h-full flex-col items-center justify-start max-md:gap-2 md:items-end">
            <p className="text-muted-foreground text-sm max-sm:text-xs">
              Delivery fee
            </p>
            <p className="font-medium max-md:text-sm">
              ${restaurant.fee || "N/A"}
            </p>
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
