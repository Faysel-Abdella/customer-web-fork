"use client";
import React, { useState } from "react";

import ReviewStars from "@/components/ReviewStars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Review } from "./RestaurantReviews";

interface ReviewCardProps {
  review: Review;
}
const ReviewCard = ({ review }: ReviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const maxLength = 100;
  const shouldTruncate = review.review.length > maxLength;
  const displayText = isExpanded
    ? review.review
    : review.review.slice(0, maxLength);
  return (
    <div className="flex gap-3 border-b p-4">
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage
          src={review.profile || "/placeholder.svg"}
          alt={review.name}
        />
        <AvatarFallback className="text-primary font-medium">
          {review.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold">{review.name}</h3>
          <span className="text-muted-foreground text-xs whitespace-nowrap">
            {review.date}
          </span>
        </div>

        <div className="mb-2 flex items-center gap-1">
          <ReviewStars rating={review.rating} />
        </div>

        <div className="text-muted text-sm leading-relaxed">
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
