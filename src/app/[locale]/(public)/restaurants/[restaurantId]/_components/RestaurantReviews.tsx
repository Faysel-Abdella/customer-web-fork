import React from "react";

import ReviewCard from "./ReviewCard";

export interface Review {
  name: string;
  profile: string;
  rating: number;
  review: string;
  date: string;
}
const sampleReviews: Review[] = [
  {
    name: "Growz Tech",
    profile: "/placeholder.svg?height=40&width=40",
    rating: 5,
    review:
      "Excellent service! The team was very professional and delivered exactly what we needed. Their attention to detail and customer service exceeded our expectations. I would definitely recommend them to anyone looking for quality work.",
    date: "Jul 14, 2025",
  },
  {
    name: "Sarah Johnson",
    profile: "/placeholder.svg?height=40&width=40",
    rating: 4,
    review:
      "Great experience overall. The project was completed on time and the quality was good. There were a few minor issues but they were quickly resolved by the support team.",
    date: "Jul 19, 2025",
  },
  {
    name: "Mike Chen",
    profile: "/placeholder.svg?height=40&width=40",
    rating: 5,
    review:
      "Outstanding work! Very impressed with the level of professionalism and expertise. The team went above and beyond to ensure everything was perfect. Communication was excellent throughout the entire process.",
    date: "Jul 12, 2025",
  },
  {
    name: "Emily Davis",
    profile: "/placeholder.svg?height=40&width=40",
    rating: 3,
    review:
      "Good service but there's room for improvement. The final result was satisfactory but took longer than expected to complete.",
    date: "Jul 10, 2025",
  },
];

const RestaurantReviews = () => {
  return (
    <div className="w-full space-y-3">
      {sampleReviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
};

export default RestaurantReviews;
