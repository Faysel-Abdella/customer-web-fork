import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

const categories = [
  {
    name: "Foods",
    icon: "🍔",
    img: "/assets/images/homepage/fast_food.webp",
    color: "from-orange-400 to-red-500",
    count: "120+",
  },
  {
    name: "Drinks",
    icon: "🥤",
    img: "/assets/images/homepage/beverage.jpg",
    color: "from-blue-400 to-cyan-500",
    count: "80+",
  },
  {
    name: "Desserts",
    icon: "🍰",
    img: "/assets/images/homepage/desserts.jpg",
    color: "from-pink-400 to-purple-500",
    count: "60+",
  },

  {
    name: "Asian",
    icon: "🍜",
    img: "/assets/images/homepage/asian.png",
    color: "from-green-400 to-teal-500",
    count: "90+",
  },
];

export function Categories() {
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 md:mb-2 md:text-3xl dark:text-white">
            Browse Categories
          </h2>
          <p className="text-gray-600 max-md:text-sm dark:text-gray-400">
            Discover your favorite cuisines
          </p>
        </div>
        <Link href={"#"} className="text-primary underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-4 xl:gap-6">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="group bg-secondary dark:bg-secondary cursor-pointer border p-0 shadow-none backdrop-blur-sm transition-all duration-300"
          >
            <CardContent className="relative flex flex-col items-center justify-between gap-2 overflow-hidden p-2 pb-4 text-center">
              <div className="relative h-28 w-full overflow-hidden rounded-2xl">
                <Image
                  src={category.img}
                  fill
                  alt={`${category.name} category food`}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-primary mb-1 font-bold transition-all group-hover:underline dark:text-white">
                  {category.name}
                </h3>
                <p className="text-secondary-foreground text-sm dark:text-gray-400">
                  {category.count} options
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
