import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

const categories = [
  {
    name: "Fast Food",
    icon: "🍔",
    img: "/assets/images/homepage/fast_food.webp",
    color: "from-orange-400 to-red-500",
    count: "120+",
  },
  {
    name: "Beverages",
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
  {
    name: "Healthy",
    icon: "🥗",
    img: "/assets/images/homepage/healthy.jpg",
    color: "from-emerald-400 to-green-500",
    count: "70+",
  },
];

export function Categories() {
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Browse Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Discover your favorite cuisines
          </p>
        </div>
        <Link href={"#"} className="text-primary underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
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
