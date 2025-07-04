import React from "react";

import { format } from "date-fns";
import { Clock, Store, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Offer } from "@/types/restaurant.types";

interface OffersCardProps {
  offer: Offer;
}
const OffersCard = ({ offer }: OffersCardProps) => {
  const getDiscountText = () => {
    if (offer.title.toLowerCase().includes("free delivery")) {
      return "FREE DELIVERY";
    }
    return `${offer.discount}% OFF`;
  };
  return (
    <Card className="group dark:bg-card dark:border-border w-80 overflow-hidden border border-orange-200 p-0 shadow-none transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative">
          {/* Orange accent bar */}
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400" />

          <div className="p-4">
            {/* Header */}
            <div className="mb-2 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="mb-1 text-base font-bold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-gray-100 dark:group-hover:text-orange-400">
                  {offer.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Store className="h-3 w-3" />
                  <span>{offer.restaruentDetail.title}</span>
                </div>
              </div>

              {/* Discount Badge */}
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-sm font-bold text-white shadow-lg hover:from-orange-600 hover:to-amber-600">
                {getDiscountText()}
              </Badge>
            </div>

            {/* Promo Code Section */}
            <div className="bg-secondary dark:bg-secondary mb-3 rounded-lg border-2 border-dashed border-orange-300 p-3 dark:border-orange-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Promo Code:
                  </span>
                  <code className="rounded bg-orange-100 px-2 py-1 font-mono text-sm font-bold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                    {offer.code}
                  </code>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>
                  Expires {format(new Date(offer.end_time), "MMM dd','yyyy")}
                </span>
              </div>
            </div>

            <Button
              size="sm"
              className="mt-2 w-full bg-gradient-to-r from-orange-500 to-amber-500 font-semibold text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-amber-600 hover:shadow-xl"
              asChild
            >
              <Link href={`/restaurants/${offer.restaurant_id}`}>
                View Detail
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OffersCard;
