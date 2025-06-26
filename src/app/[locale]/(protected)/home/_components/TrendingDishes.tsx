import Image from "next/image";

import { FlameIcon as Fire, Heart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const bestSellingDishes = [
  {
    name: "Gourmet Burger",
    image: "/assets/images/homepage/dish_aloo_gobi.jpg",
    price: "$12.99",
    originalPrice: "$16.99",
    rating: 4.8,
    orders: "2.1k",
    badge: "🔥",
  },
  {
    name: "Truffle Pasta",
    image: "/assets/images/homepage/dish_biryani.jpg",
    price: "$18.99",
    originalPrice: "$24.99",
    rating: 4.9,
    orders: "1.8k",
    badge: "⭐",
  },
  {
    name: "Spicy Ramen",
    image: "/assets/images/homepage/dish_butter_chicken.jpg",
    price: "$15.99",
    originalPrice: "$19.99",
    rating: 4.7,
    orders: "3.2k",
    badge: "🌶️",
  },
  {
    name: "Margherita Pizza",
    image: "/assets/images/homepage/dish_tikka_masala.jpg",
    price: "$22.99",
    originalPrice: "$28.99",
    rating: 4.6,
    orders: "2.8k",
    badge: "🍕",
  },
];

export function TrendingDishes() {
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Trending Dishes
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Most loved by our customers
          </p>
        </div>
        <Fire className="h-8 w-8 text-red-500" />
      </div>
      <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {bestSellingDishes.map((dish, index) => (
          <Card
            key={index}
            className="group bg-secondary cursor-pointer overflow-hidden border p-0 shadow-none backdrop-blur-sm transition-all duration-300"
          >
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/90 shadow-lg hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-700"
                  >
                    <Heart className="h-4 w-4 text-gray-700 dark:text-gray-200" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                  {dish.name}
                </h3>
                <div className="mb-3 flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {dish.rating}
                    </span>
                  </div>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {dish.orders} orders
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-orange-500">
                      {dish.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through dark:text-gray-500">
                      {dish.originalPrice}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-red-600 dark:shadow-orange-500/40"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
