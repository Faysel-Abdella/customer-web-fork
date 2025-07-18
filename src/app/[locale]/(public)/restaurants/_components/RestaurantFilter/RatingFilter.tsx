"use client";
import { Star } from "lucide-react";

import ReviewStars from "@/components/ReviewStars";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface RatingFilterProps {
  className?: string;
}
const RatingFilter = ({ className }: RatingFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("rounded-full", className)}>
          <Star />
          Ratings
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup>
          {Array.from({ length: 5 }).map((_, index) => (
            <DropdownMenuRadioItem key={index} value={(index + 1).toString()}>
              <ReviewStars rating={index + 1} />
            </DropdownMenuRadioItem>
          ))}
          <DropdownMenuRadioItem value="top">High Rating</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RatingFilter;
