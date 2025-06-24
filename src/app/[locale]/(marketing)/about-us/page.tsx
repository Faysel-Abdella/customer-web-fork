import React from "react";
import Image from "next/image";

import { Calendar, Clock, ShoppingBag, Truck, Utensils } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import TitleBanner from "../_components/TitleBanner";

const services = [
  {
    icon: ShoppingBag,
    title: "Online Order",
    description: "Easy online ordering system",
  },
  {
    icon: Calendar,
    title: "Pre-Reservation",
    description: "Book your table in advance",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Available round the clock",
  },
  {
    icon: Utensils,
    title: "Organized Foodie Place",
    description: "Well-organized dining experience",
  },
  {
    icon: Utensils,
    title: "Clean Kitchen",
    description: "Hygienic food preparation",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery",
  },
];

const features = [
  {
    imgUrl: "/assets/images/about_us/easy-order.png",
    title: "Easy to Order",
    description: "You only need a few steps in ordering food.",
  },
  {
    imgUrl: "/assets/images/about_us/delivery.png",
    title: "Fastest Delivery",
    description: "Delivery that is always on time even faster",
  },
  {
    imgUrl: "/assets/images/about_us/high-quality.png",
    title: "Best Quality",
    description: "Not only fast for us quality is also number one",
  },
];
const AboutUsPage = () => {
  return (
    <div>
      <TitleBanner title="About us" />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="relative mx-auto h-80 w-full">
                <Image
                  src="/assets/images/chef.png"
                  alt="Chef"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-primary font-medium">— About Us —</span>
                <h2 className="mt-2 mb-4 text-3xl font-bold md:text-4xl">
                  We Are More Than Multiple Services
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Order food from your nearby restaurant and also reserve a
                  table for dinner in choice of your restaurant.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                      <service.icon className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{service.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="dark:bg-secondary bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="text-primary font-medium">— Features —</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              How Does it Works
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="dark:bg-background text-center shadow-none"
              >
                <CardContent className="flex flex-col items-center p-8">
                  <div className="relative size-16">
                    <Image
                      fill
                      src={feature.imgUrl}
                      alt={`${feature.title} image`}
                    />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
