import { X } from "lucide-react";

import { getRestaurantReviews } from "@/actions/restaurants.actions";

import ReviewCard from "./ReviewCard";
import ReviewSummary from "./ReviewSummary";

interface RestaurantReviewsProps {
  restaurantId: string;
}

const RestaurantReviews = async ({ restaurantId }: RestaurantReviewsProps) => {
  const { data: reviews } = await getRestaurantReviews(restaurantId);

  if (!reviews)
    return (
      <div className="flex h-64 w-full items-center justify-center gap-2">
        <X /> <span>Something went wrong</span>
      </div>
    );

  const ratingDistribution = {
    "5_star": reviews["5_star"].count,
    "4_star": reviews["4_star"].count,
    "3_star": reviews["3_star"].count,
    "2_star": reviews["2_star"].count,
    "1_star": reviews["1_star"].count,
  };

  return (
    <div className="">
      <ReviewSummary
        averageRating={reviews.average_rating}
        ratingDistribution={ratingDistribution}
        totalRatings={reviews.total_rating.count}
      />
      <div className="divide-border divide-y">
        {reviews.list.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantReviews;
