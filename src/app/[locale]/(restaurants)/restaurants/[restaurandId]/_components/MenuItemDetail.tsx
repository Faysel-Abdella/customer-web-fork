"use client";
import { FormEvent, useState, useTransition } from "react";
import Image from "next/image";

import { Clock, Heart, Loader2, Minus, Plus, Star } from "lucide-react";
import { toast } from "sonner";

import { addToCartAction } from "@/actions/cart.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { objectToFormData } from "@/lib/utils";
import { MenuItem } from "@/types/restaurant.types";

import AddOnList from "./AddOnList";

interface MenuItemDetailProps {
  menuItem: MenuItem;
  restaurantId: string;
}
const MenuItemDetail = ({ menuItem, restaurantId }: MenuItemDetailProps) => {
  const [isPending, startTransition] = useTransition();
  const [itemQuantity, setItemQuantity] = useState(1);
  const [selectedAddonIds, setSelectedAddonIds] = useState<number[]>([]);
  const { refreshCart, currentRestaurantId } = useCart();
  const [isClearCartOpen, setClearCartOpen] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !currentRestaurantId ||
      currentRestaurantId.toString() === restaurantId
    ) {
      handleAddTocart();
    } else if (currentRestaurantId.toString() !== restaurantId) {
      setClearCartOpen(true);
    }
  };

  const handleAddTocart = async (clearCart?: boolean) => {
    const data = objectToFormData({
      "Cart[store_id]": restaurantId,
      "Cart[type_id]": menuItem.type_id.toString(),
      "CartItem[price_id]": menuItem.itemPrice[0].id.toString(),
      "CartItem[product_id]": menuItem.id.toString(),
      "CartItem[quantity]": itemQuantity.toString(),
      "Cart[addones]": getSelectedAddons(),
    });

    startTransition(async () => {
      const results = await addToCartAction(data, clearCart);
      if (results.error) {
        toast.error("Failed at adding item to cart", {
          description: results.error,
        });
      }
      if (results.success) {
        toast.success("Successfully added item to cart");
        refreshCart();
      }
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

  const calculateAddOnPrice = (): number => {
    let addonPrice = 0;
    menuItem.addOnsList.forEach((item) => {
      if (selectedAddonIds.includes(item.id))
        addonPrice = addonPrice + parseInt(item.price);
    });

    return addonPrice;
  };

  const getSelectedAddons = () => {
    let selectedAddons: { add_on_id: string; price: string }[] = [];
    menuItem.addOnsList.forEach((item) => {
      if (selectedAddonIds.includes(item.id)) {
        selectedAddons = [
          { add_on_id: item.id.toString(), price: item.price.toString() },
          ...selectedAddons,
        ];
      }
    });

    return selectedAddons;
  };
  return (
    <>
      <AlertDialog open={isClearCartOpen} onOpenChange={setClearCartOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear cart?</AlertDialogTitle>
            <AlertDialogDescription>
              The items in your cart are from another restaurant, If you proceed
              the items currently in your cart will be cleared.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAddTocart(true)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
                <div className="flex items-center justify-between">
                  <div className="flex gap-5">
                    <div className="flex items-center gap-2">
                      {renderStars(menuItem.avg_rating)} {menuItem.avg_rating}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Clock size={16} />
                      {menuItem.cook_time} <p>minutes</p>
                    </div>
                  </div>
                  <p className="text-primary text-lg font-semibold">
                    {menuItem.itemPrice[0].price}$
                  </p>
                </div>
              </div>
              <div className="space-y-2 border-b pb-4">
                <p className="font-bold">Description</p>
                <p className="text-muted-foreground">{menuItem.description}</p>
              </div>
              <AddOnList
                addOns={menuItem.addOnsList}
                selectedAddonIds={selectedAddonIds}
                setSelectedAddonIds={setSelectedAddonIds}
              />
            </div>
          </div>
          <DialogFooter className="px-2">
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="space-y-4">
                <p>Quantity:</p>
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
              </div>
              <div className="border-primary flex justify-between rounded-lg border p-2">
                <div>
                  <p>Item price</p>
                  <p>Add-on price</p>
                  <p>Total price</p>
                </div>
                <div>
                  <p>{menuItem.itemPrice[0].price} $</p>
                  <p>{calculateAddOnPrice()}$</p>
                  <p className="text-primary">
                    {(parseInt(menuItem.itemPrice[0].price) +
                      calculateAddOnPrice()) *
                      itemQuantity}
                    $
                  </p>
                </div>
              </div>
              <Button
                disabled={isPending || itemQuantity <= 0}
                className="w-full"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Add to cart"
                )}
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuItemDetail;
