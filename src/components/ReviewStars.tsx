import React from "react";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface ReviewStarsProps {
  className?: string;
  rating: number;
}
const ReviewStars = ({ rating, className }: ReviewStarsProps) => {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={cn(
        `h-4 w-4`,
        className,
        index < rating
          ? "fill-orange-400 text-orange-400"
          : "fill-muted-foreground text-muted-foreground",
      )}
    />
  ));
};

export default ReviewStars;
