import Image from "next/image";

import { Clock, FlameIcon as Fire, Heart, Star } from "lucide-react";

import { getPopularDishes } from "@/actions/actions";
import MenuItemDetail from "@/app/[locale]/(restaurants)/restaurants/[restaurandId]/_components/MenuItemDetail";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export async function TrendingDishes() {
  const { data } = await getPopularDishes();
  if (data)
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
          {data.slice(0, 4).map((dish, index) => (
            <Card
              key={index}
              className="group cursor-pointer overflow-hidden border p-0 shadow-none backdrop-blur-sm transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={dish.image_file || "/placeholder.svg"}
                      alt={dish.title}
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
                    {dish.title}
                  </h3>
                  <div className="mb-3 flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {dish.avg_rating}
                      </span>
                    </div>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <span>{dish.cook_time}</span>
                      <Clock size={16} />
                      <span>minutes</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-orange-500">
                        {dish.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through dark:text-gray-500">
                        {dish.price}
                      </span>
                    </div>
                    <MenuItemDetail
                      menuItemId={dish.id.toString()}
                      className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
}
