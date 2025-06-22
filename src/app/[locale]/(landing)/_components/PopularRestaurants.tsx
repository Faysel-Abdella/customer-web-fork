import React from "react";
import Image from "next/image";

import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const popularRestaurants = [
  {
    name: "Eyob's Kitchen",
    description: "Award-winning chef with 15+ years of culinary excellence",
    image: "/assets/images/homepage/restaurant_1.jpg",
    rating: 4.9,
    deliveryTime: "20-30 min",
    isOpen: true,
    cuisine: "Ethiopian",
    priceRange: "$$",
    badge: "🏆 Top Rated",
    orders: "5k+ orders",
    discount: "20% OFF",
  },
  {
    name: "Zemen Fusion",
    description: "Modern Ethiopian cuisine meets international flavors",
    image: "/assets/images/homepage/restaurant_2.jpg",
    rating: 4.8,
    deliveryTime: "25-35 min",
    isOpen: true,
    cuisine: "Fusion",
    priceRange: "$$$",
    badge: "🔥 Trending",
    orders: "3.2k+ orders",
    discount: "15% OFF",
  },
  {
    name: "Lydia Boone",
    description: "Luxury dining experience with premium ingredients",
    image: "/assets/images/homepage/restaurant_3.webp",
    rating: 4.7,
    deliveryTime: "35-45 min",
    isOpen: false,
    cuisine: "Fine Dining",
    priceRange: "$$$$",
    badge: "💎 Premium",
    orders: "2.8k+ orders",
    discount: null,
  },
  {
    name: "Adama Pizza Hub",
    description: "Authentic wood-fired pizzas and classic pasta dishes",
    image: "/assets/images/homepage/restaurant_4.jpg",
    rating: 4.6,
    deliveryTime: "20-25 min",
    isOpen: true,
    cuisine: "Italian",
    priceRange: "$$",
    badge: "👨‍👩‍👧‍👦 Family Fave",
    orders: "4.1k+ orders",
    discount: "10% OFF",
  },
  {
    name: "Lion's Burger",
    description: "Gourmet burgers, loaded fries, and creamy milkshakes",
    image: "/assets/images/homepage/restaurant_5.jpg",
    rating: 4.8,
    deliveryTime: "15-25 min",
    isOpen: true,
    cuisine: "Burgers",
    priceRange: "$$",
    badge: "⚡ Fast Delivery",
    orders: "6k+ orders",
    discount: "Free Drink",
  },
  {
    name: "Lydia Boone",
    description: "Luxury dining experience with premium ingredients",
    image: "/assets/images/homepage/restaurant_3.webp",
    rating: 4.7,
    deliveryTime: "35-45 min",
    isOpen: false,
    cuisine: "Fine Dining",
    priceRange: "$$$$",
    badge: "💎 Premium",
    orders: "2.8k+ orders",
    discount: null,
  },
];
const PopularRestaurants = () => {
  return (
    <section className="relative min-h-dvh w-full">
      <Image
        fill
        src={"/assets/images/landing/popular-resturent-bg.jpg"}
        alt={"hero section banner"}
        className="object-cover"
      />
      <div className="absolute top-0 flex h-full w-full flex-col justify-center gap-10 bg-black/60 px-32 py-10">
        <div className="flex w-full justify-center">
          <p className="text-5xl font-bold text-white"> Popular Restaurants</p>
        </div>
        <div className="grid h-full grid-cols-3 gap-5">
          {popularRestaurants.map((restaurant, index) => (
            <Card
              key={index}
              className="h-full gap-2 overflow-hidden border-gray-800 bg-gray-900 py-0"
            >
              <div className="relative h-3/5 w-full">
                <Image
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  fill
                  className="w-full object-cover"
                />
              </div>
              <CardContent className="h-2/5 px-4">
                <h3 className="mb-1 text-lg font-bold text-white">
                  {restaurant.name}
                </h3>
                <p className="mb-2 text-sm text-gray-400">
                  {restaurant.cuisine}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(restaurant.rating)
                            ? "fill-current text-yellow-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-white">
                      {restaurant.rating}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex w-full justify-center">
          <Button className="w-fit">View All Restaurants</Button>
        </div>
      </div>
    </section>
  );
};

export default PopularRestaurants;
