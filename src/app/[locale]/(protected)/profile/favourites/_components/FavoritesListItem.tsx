import Image from "next/image";

import { Clock, DollarSign, MapPin, MapPinned, Star } from "lucide-react";

import FavoriteButton from "@/components/FavoriteButton";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Restaurant } from "@/types/restaurant.types";

interface FavoritesListItemProps {
  restaurant: Restaurant;
}
const FavoritesListItem = ({ restaurant }: FavoritesListItemProps) => {
  return (
    <Card
      key={restaurant.id}
      className="cursor-pointer overflow-hidden p-0 transition-shadow hover:shadow-md"
    >
      <Link href={`/restaurants/${restaurant.id}`}>
        <CardContent className="p-0">
          <div className="flex max-md:flex-col">
            {/* Image Section */}
            <div className="relative h-28 w-full flex-shrink-0 sm:h-32 md:h-40 md:w-40">
              <Image
                src={restaurant.image_file || "/placeholder.svg"}
                alt={restaurant.title}
                className="h-full w-full object-cover"
                fill
              />
              <FavoriteButton
                is_favorite={restaurant.is_favourite === 1}
                itemId={restaurant.id.toString()}
                type="restaurant"
              />
            </div>

            {/* Content Section */}
            <div className="flex min-w-0 flex-1 flex-col justify-between overflow-hidden p-3 sm:p-4">
              <div className="space-y-2">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="min-w-0 flex-1 truncate leading-tight font-semibold sm:text-lg">
                    {restaurant.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 flex-shrink-0 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">
                    {restaurant.average_rating}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1 truncate pl-2 text-xs">
                    <Clock className="h-3 w-3 flex-shrink-0" />{" "}
                    {restaurant.estimated_delivery_time}
                  </span>
                </div>

                <div className="text-muted-foreground flex min-w-0 items-center gap-1 text-xs">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{restaurant.location}</span>
                </div>
                <div className="text-muted-foreground line-clamp-2 flex min-w-0 items-center gap-1 text-xs">
                  <span className="line-clamp-2">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Laborum deleniti laboriosam obcaecati odit nulla nam magnam,
                    at esse numquam voluptates repellendus maiores in quis eius
                    itaque id suscipit cumque rerum!
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between gap-2 pt-2">
                  <div className="flex min-w-0 items-center gap-2 text-xs sm:gap-3">
                    <div className="flex flex-shrink-0 items-center gap-1">
                      <DollarSign className="h-3 w-3 text-green-600" />
                      <span className="font-medium">
                        {restaurant.price_per_person}
                      </span>
                    </div>
                    <div className="text-muted-foreground flex min-w-0 items-center gap-1 sm:flex">
                      <MapPinned className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">
                        {restaurant.estimated_delivery_distance}
                      </span>
                    </div>
                  </div>
                  <span className="text-muted-foreground flex-shrink-0 text-xs">
                    +${restaurant.estimated_delivery_fees}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default FavoritesListItem;
