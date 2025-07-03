import Image from "next/image";
import Link from "next/link";

import { ChevronRight, Clock, Heart, Star, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const topRestaurants = [
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
];

export function TopRestaurants() {
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 md:mb-2 md:text-3xl dark:text-white">
            Featured Restaurants
          </h2>
          <p className="text-gray-600 max-md:text-sm dark:text-gray-400">
            Handpicked by our food experts
          </p>
        </div>
        <Link
          href="/restaurants"
          className="group flex items-center font-semibold text-orange-500 hover:text-orange-600"
        >
          View All
          <ChevronRight className="ml-1 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="space-y-6">
        {topRestaurants.map((restaurant, index) => (
          <Card
            key={index}
            className="group dark:bg-secondary cursor-pointer overflow-hidden border bg-white/70 p-0 shadow-none backdrop-blur-sm transition-all duration-300"
          >
            <CardContent className="p-2 py-3">
              <div className="flex">
                <div className="relative aspect-video w-2/5 overflow-hidden rounded-xl md:aspect-square">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    className="rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {restaurant.discount && (
                    <div className="absolute top-2 left-2">
                      <Badge className="animate-pulse border-0 bg-red-500 text-white shadow-lg">
                        {restaurant.discount}
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/90 shadow-lg hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-700"
                    >
                      <Heart className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-col justify-between pl-2 md:col-span-2">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {restaurant.name}
                      </h3>

                      <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-400">
                        {restaurant.description}
                      </p>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1 rounded-full bg-yellow-50 px-3 py-1 dark:bg-yellow-900/20">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {restaurant.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {restaurant.deliveryTime}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600 dark:text-gray-400">
                            {restaurant.cuisine}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 rounded-full bg-green-50 px-3 py-1 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                        <Truck className="h-4 w-4" />
                        <span>Free delivery</span>
                      </div>
                    </div>
                    <Button className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 shadow-lg shadow-orange-500/25 transition-transform duration-200 group-hover:scale-105 hover:from-orange-600 hover:to-red-600 dark:shadow-orange-500/40">
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
