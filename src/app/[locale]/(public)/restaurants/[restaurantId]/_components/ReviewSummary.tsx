import FadingDivider from "@/components/FadingDivider";
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
    <div className="flex items-center gap-8">
      <div className="flex h-full w-fit flex-col items-center justify-between">
        <div className="flex items-end gap-2">
          <div className="mb-1 text-5xl font-bold">
            {Number.parseFloat(averageRating).toFixed(1)}
          </div>
          <div className="text-muted-foreground mb-2 text-sm">
            ({totalRatings})
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ReviewStars rating={Number.parseFloat(averageRating)} />
        </div>
      </div>

      <div className="flex-1">
        <div className="space-y-2">
          {ratingBars.map((bar) => (
            <div key={bar.stars} className="flex items-center gap-3">
              <span className="text-muted-foreground text-xs">{bar.stars}</span>

              <Progress value={getRatingPercentage(bar.count)} />
            </div>
          ))}
        </div>
      </div>
      <FadingDivider className="h-28 w-px bg-gradient-to-b max-md:hidden" />
      <p className="text-muted-foreground w-1/5 text-sm max-md:hidden">
        Ratings and reviews are verified and come from people who received the
        same services.
      </p>
    </div>
  );
};

export default ReviewSummary;
