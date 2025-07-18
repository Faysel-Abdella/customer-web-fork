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
    <div className="flex gap-4 border-b p-6">
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage
          src={review.created_by_image}
          alt={review.created_by_name}
        />
        <AvatarFallback className="text-primary font-medium">
          {review.created_by_name}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold">{review.created_by_name}</h3>

          <span className="text-muted-foreground text-sm whitespace-nowrap">
            {review.created_on &&
              format(new Date(review.created_on), "MMM dd',' yyyy")}
          </span>
        </div>

        <div className="mb-3 flex items-center gap-1">
          <ReviewStars rating={review.restaurant_rating} />
          <span className="text-muted-foreground ml-1 text-sm">
            ({review.restaurant_rating}/5)
          </span>
        </div>

        <div className="text-muted-foreground text-sm leading-relaxed">
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
    </div>
  );
};

export default ReviewCard;
