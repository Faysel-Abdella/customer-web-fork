"use client";
import { useState, useTransition } from "react";

import { Home, Loader } from "lucide-react";
import { toast } from "sonner";

import { addRating } from "@/actions/profile.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { OrderDetail } from "@/types/profile.types";

import StarRating from "./StarRating";

interface ReviewModalProps {
  order: OrderDetail;
  className?: string;
}
const ReviewModal = ({ order, className }: ReviewModalProps) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [restaurantRating, setRestaurantRating] = useState(0);
  const [restaurantComment, setRestaurantComment] = useState("");

  const [riderRating, setRiderRating] = useState(0);
  const [riderComment, setRiderComment] = useState("");
  const [isRating, startRating] = useTransition();

  const handleSaveReview = () => {
    startRating(async () => {
      let ratingRestaurant = null;
      let ratingDriver = null;
      if (restaurantComment.trim() != "" || restaurantRating != 0) {
        const { success } = await addRating({
          Rating: {
            rating: restaurantRating.toString(),
            comment: restaurantComment,
            model_id: order.store_id.toString(),
            orderId: order.id.toString(),
          },
        });
        ratingRestaurant = success;
      }
      if (riderComment.trim() != "" || riderRating != 0) {
        if (order.driver_id) {
          const { success } = await addRating({
            Rating: {
              rating: riderRating.toString(),
              comment: riderComment,
              model_id: order.driver_id.toString(),
              orderId: order.id.toString(),
            },
          });

          ratingDriver = success;
        }
      }

      if (ratingDriver && ratingRestaurant)
        toast.success("Rated both restaurant and driver");
      if (ratingDriver && !ratingRestaurant)
        toast.message("Rated both driver but failed at rating restaurant");
      if (!ratingDriver && ratingRestaurant)
        toast.message("Rated restaurant but failed at rating driver");
      if (!ratingDriver && !ratingRestaurant)
        toast.error("Failed at rating both restaurant and driver");
    });
    console.log({
      order,
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
        <Button className={className} disabled={isRating}>
          {isRating ? <Loader className="animate-spin" /> : "Leave a review"}
        </Button>
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
            {isRating ? <Loader className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
