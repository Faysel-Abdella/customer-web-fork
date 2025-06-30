"use client";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";

import { Clock, Heart, Minus, Plus, Star } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useAddToCart } from "@/hooks/cartHooks.ts/useAddToCart";
import { MenuItem } from "@/types/restaurant.types";

interface MenuItemDetailProps {
  menuItem: MenuItem;
  restaurantId: string;
}
const MenuItemDetail = ({ menuItem, restaurantId }: MenuItemDetailProps) => {
  const { addToCart, error, isLoading, isSuccess } = useAddToCart();
  const [itemQuantity, setItemQuantity] = useState(1);
  const { refreshCart } = useCart();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    addToCart({
      "Cart[store_id]": restaurantId,
      "Cart[type_id]": menuItem.type_id.toString(),
      "CartItem[price_id]": menuItem.itemPrice[0].id.toString(),
      "CartItem[product_id]": menuItem.id.toString(),
      "CartItem[quantity]": itemQuantity.toString(),
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-orange-400 text-orange-400"
            : i < rating
              ? "fill-orange-200 text-orange-400"
              : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  useEffect(() => {
    if (error) {
      toast.error("Failed at adding item to cart", { description: error });
    }
    if (isSuccess) {
      toast.success("Successfully added item to cart");
      refreshCart();
    }
  }, [error, isSuccess, refreshCart]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View details</Button>
      </DialogTrigger>
      <DialogContent className="max-h-dvh overflow-auto px-2 py-4 pt-5 max-md:min-w-screen max-md:rounded-none">
        <DialogHeader>
          <DialogTitle className="sr-only">{menuItem.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {menuItem.title} details
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Badge className="absolute top-5 left-5 z-10 border-green-700 bg-green-500">
            Available
          </Badge>
          <Carousel className="p-0" opts={{ loop: true }}>
            <CarouselContent className="-ml-2 h-80 w-full pr-0">
              {menuItem.menuImages.map((itemImage) => (
                <CarouselItem key={itemImage.id} className="w-full">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg">
                    <Image
                      src={itemImage.url}
                      fill
                      alt={`${itemImage.name} image`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-secondary dark:bg-secondary ml-14" />
            <CarouselNext className="bg-secondary dark:bg-secondary mr-14" />
          </Carousel>
          <div className="space-y-4 p-2">
            <div className="border-b pb-2">
              <div className="flex w-full items-center justify-between">
                <p className="text-xl font-semibold">{menuItem.title}</p>
                <Button variant="ghost" size="icon" className="">
                  <Heart
                    className={`h-5 w-5 ${
                      menuItem.is_favourite
                        ? "fill-red-500 text-red-500"
                        : "text-muted-foreground hover:text-red-500"
                    }`}
                  />
                </Button>
              </div>

              <Badge variant={"secondary"} className="border-border mb-2">
                {menuItem.cuisine_type_name}
              </Badge>
              <div className="flex gap-5">
                <div className="flex items-center gap-2">
                  {renderStars(menuItem.avg_rating)} {menuItem.avg_rating}
                </div>
                <div className="text-muted-foreground flex items-center gap-1">
                  <Clock size={16} />
                  {menuItem.cook_time} <p>minutes</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 border-b pb-4">
              <p className="font-bold">Description</p>
              <p className="text-muted-foreground">{menuItem.description}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Button
                variant={"outline"}
                onClick={() =>
                  setItemQuantity((prev) => (prev > 0 ? prev - 1 : prev))
                }
                type="button"
              >
                <Minus />
              </Button>
              <Input
                className="w-28"
                type="number"
                min={1}
                max={10}
                value={itemQuantity}
                onChange={(e) => setItemQuantity(parseInt(e.target.value))}
              />
              <Button
                variant={"outline"}
                onClick={() =>
                  setItemQuantity((prev) => (prev < 10 ? prev + 1 : prev))
                }
                type="button"
              >
                <Plus />
              </Button>
            </div>
            <Button disabled={isLoading}>Add to cart</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemDetail;
