import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export default function StarRating({
  rating,
  onRatingChange,
}: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          ={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="p-1"
        >
          <Star
            className={`h-6 w-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
          />
        </button>
      ))}
    </div>
  );
}
