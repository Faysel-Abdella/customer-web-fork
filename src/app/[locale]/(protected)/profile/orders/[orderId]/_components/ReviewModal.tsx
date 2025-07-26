"use client";
import { useState } from "react";

import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import StarRating from "./StarRating";

interface ReviewModalProps {
  orderId: string;
  className?: string;
}
const ReviewModal = ({ orderId, className }: ReviewModalProps) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [restaurantRating, setRestaurantRating] = useState(0);
  const [riderRating, setRiderRating] = useState(0);
  const [restaurantComment, setRestaurantComment] = useState("");
  const [riderComment, setRiderComment] = useState("");

  const handleSaveReview = () => {
    console.log({
      orderId,
      restaurantRating,
      riderRating,
      restaurantComment,
      riderComment,
    });
    setIsReviewModalOpen(false);
  };

  return (
    <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
      <DialogTrigger asChild>
        <Button className={className}>Leave a review</Button>
      </DialogTrigger>
      <DialogContent className="mx-auto max-h-screen max-w-md overflow-y-auto">
        <DialogHeader className="flex flex-row items-center gap-3 space-y-0">
          <DialogTitle className="text-lg font-medium text-orange-500">
            Rate Us
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-secondary flex items-center gap-3 rounded-lg p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20">
              <Home className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <p className="font-medium">Delivered at Home</p>
              <p className="text-sm">Your order was delivered at 10:04 AM</p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-medium">Rate Restaurant</h3>
            <StarRating
              rating={restaurantRating}
              onRatingChange={setRestaurantRating}
            />
            <Textarea
              placeholder="Your word makes us a better place"
              value={restaurantComment}
              onChange={(e) => setRestaurantComment(e.target.value)}
              className="bg-secondary mt-3 resize-none border"
              rows={3}
            />
          </div>

          <div>
            <h3 className="mb-3 font-medium">Rate Your Rider</h3>
            <StarRating rating={riderRating} onRatingChange={setRiderRating} />
          </div>

          <div>
            <h3 className="mb-3 font-medium">Write a comment</h3>
            <Textarea
              placeholder="Your word makes us a better place"
              value={riderComment}
              onChange={(e) => setRiderComment(e.target.value)}
              className="bg-secondary resize-none border"
              rows={5}
            />
          </div>

          <Button onClick={handleSaveReview} className="w-full">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
