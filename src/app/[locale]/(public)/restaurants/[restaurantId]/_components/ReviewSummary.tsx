import React from "react";

import { Star } from "lucide-react";

import ReviewStars from "@/components/ReviewStars";
import { Progress } from "@/components/ui/progress";

interface ReviewSummaryProps {
  averageRating: string;
  totalRatings: string;
  ratingDistribution: {
    "5_star": string;
    "4_star": string;
    "3_star": string;
    "2_star": string;
    "1_star": string;
  };
}
const ReviewSummary = ({
  averageRating,
  totalRatings,
  ratingDistribution,
}: ReviewSummaryProps) => {
  const getRatingPercentage = (starCount: string) => {
    const total = Number.parseInt(totalRatings.replace(/,/g, ""));
    const count = Number.parseInt(starCount.replace(/,/g, ""));

    return total > 0 ? (count / total) * 100 : 0;
  };

  const ratingBars = [
    { stars: 5, count: ratingDistribution["5_star"] },
    { stars: 4, count: ratingDistribution["4_star"] },
    { stars: 3, count: ratingDistribution["3_star"] },
    { stars: 2, count: ratingDistribution["2_star"] },
    { stars: 1, count: ratingDistribution["1_star"] },
  ];

  return (
    <div className="flex items-start gap-8">
      <div className="flex flex-col items-center">
        <div className="mb-1 text-5xl font-bold">
          {Number.parseFloat(averageRating).toFixed(1)}
        </div>
        <div className="text-muted-foreground mb-2 text-sm">out of 5</div>
      </div>

      <div className="flex-1">
        <div className="mb-4 flex items-center gap-2">
          <ReviewStars rating={Number.parseFloat(averageRating)} />
        </div>

        <div className="space-y-2">
          {ratingBars.map((bar) => (
            <div key={bar.stars} className="flex items-center gap-3">
              <div className="flex w-12 items-center gap-1">
                <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                <span className="text-muted-foreground text-xs">
                  {bar.stars}
                </span>
              </div>
              <Progress value={getRatingPercentage(bar.count)} />
            </div>
          ))}
        </div>
      </div>

      <div className="text-right">
        <div className="text-muted-foreground text-sm">
          {totalRatings} Ratings
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
