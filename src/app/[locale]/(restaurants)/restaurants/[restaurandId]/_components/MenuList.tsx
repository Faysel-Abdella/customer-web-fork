import Image from "next/image";

import { Plus, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const mockMenuItems = [
  {
    id: 1,
    name: "Shiro",
    description:
      "Traditional Ethiopian chickpea stew with berbere spices, served with injera bread",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Traditional",
    isPopular: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Shawerma 2",
    description:
      "Premium shawarma with tender lamb, fresh vegetables, and tahini sauce",
    price: 15.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Middle Eastern",
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 3,
    name: "Special Shawerma",
    description:
      "Our signature shawarma with mixed meats, special sauce, and premium toppings",
    price: 18.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Middle Eastern",
    isPopular: true,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 4,
    name: "Lasagna",
    description:
      "Classic Italian lasagna with layers of pasta, meat sauce, and three cheeses",
    price: 16.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Italian",
    rating: 4.5,
    reviews: 78,
  },
  {
    id: 5,
    name: "Grilled Steak",
    description:
      "Premium ribeye steak grilled to perfection, served with roasted vegetables",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Grill",
    rating: 4.7,
    reviews: 92,
  },
];

const MenuList = () => {
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
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {mockMenuItems.map((item) => (
          <Card
            key={item.id}
            className="gap-0 overflow-hidden border py-0 shadow-none transition-all duration-300"
          >
            <CardContent className="px-2 pt-2">
              <div className="flex flex-col md:flex-row">
                {/* Item Image */}
                <div className="relative h-48 w-full md:h-40 md:w-48">
                  <Image
                    src={"/assets/images/food_placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {item.isPopular && (
                    <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
                      🔥 Popular
                    </Badge>
                  )}
                  <div className="absolute top-2 right-2 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white">
                    {item.category}
                  </div>
                </div>

                {/* Item Details */}
                <div className="flex-1 p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="mb-1 text-xl font-semibold">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-2xl font-bold text-orange-600">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Rating and Reviews */}
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(item.rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {item.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({item.reviews} reviews)
                    </span>
                  </div>

                  {/* Add to Cart Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        className="flex items-center justify-center bg-orange-500 transition-all duration-200 hover:scale-105 hover:bg-orange-600"
                        data-item-id={item.id}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
