import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { MenuItem } from "@/types/restaurant.types";

import PopularItemImage from "./PopularItemImage";

interface PopularItemCardProps {
  menuItem: MenuItem;
}
const PopularItemCard = ({ menuItem }: PopularItemCardProps) => {
  const formatPrice = (price: string) => {
    const numPrice = Number.parseFloat(price);
    return isNaN(numPrice) ? price : `$${numPrice.toFixed(2)}`;
  };
  return (
    <Card className="group h-64 overflow-hidden border p-0 shadow-none transition-all duration-300 hover:shadow-lg">
      <Link href={`/restaurants/${menuItem.restaurant_id}`}>
        <CardContent className="p-0">
          <div className="relative">
            <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
              <PopularItemImage
                imgTitle={menuItem.title}
                imgUrl={menuItem.image_file}
              />

              <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/30 px-2 py-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">
                  {menuItem.avg_rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="space-y-1 px-4 py-1 text-center">
              <div className="flex w-full items-center justify-between">
                <h3 className="group-hover:text-primary truncate text-start text-lg font-semibold text-nowrap transition-colors">
                  {menuItem.title}
                </h3>

                <Badge variant="outline" className="h-min text-xs">
                  Healthy
                </Badge>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground text-sm">Start from</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-primary text-2xl font-bold">
                    {formatPrice((35).toString())}
                  </span>
                  {menuItem.customized_price &&
                    menuItem.customized_price !== menuItem.price && (
                      <span className="text-muted-foreground text-sm line-through">
                        {formatPrice(menuItem.price)}
                      </span>
                    )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PopularItemCard;
