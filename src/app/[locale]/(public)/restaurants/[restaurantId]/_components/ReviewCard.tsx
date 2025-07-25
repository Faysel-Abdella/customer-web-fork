"use client";
import React, { useState } from "react";

import { format } from "date-fns";

import ReviewStars from "@/components/ReviewStars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ReviewItem } from "@/types/restaurant.types";

interface ReviewCardProps {
  review: ReviewItem;
}
const ReviewCard = ({ review }: ReviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  const shouldTruncate = review.restaurant_comment.length > maxLength;
  const displayText = isExpanded
    ? review.restaurant_comment
    : review.restaurant_comment.slice(0, maxLength);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="aspect-square h-9.5 w-9.5 flex-shrink-0">
            <AvatarImage
              src={review.created_by_image}
              alt={review.created_by_name}
            />
            <AvatarFallback className="text-primary font-medium">
              {review.created_by_name}
            </AvatarFallback>
          </Avatar>
          <div className="flex w-full flex-col">
            <h3 className="line-clamp-1 text-base font-semibold">
              {review.created_by_name}
            </h3>

            <span className="text-muted-foreground text-xs whitespace-nowrap">
              {review.created_on &&
                format(new Date(review.created_on), "MMM dd',' yyyy")}
            </span>
          </div>
        </div>
        <div className="flex">
          <ReviewStars rating={review.restaurant_rating} />
        </div>
      </div>
      <div className="text-muted-foreground w-full text-sm leading-relaxed">
        {displayText}
        {shouldTruncate && !isExpanded && "..."}
        {shouldTruncate && (
          <Button
            variant="link"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-1 h-auto p-0 font-medium text-orange-600 hover:text-orange-700"
          >
            {isExpanded ? "Read less" : "Read more"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
