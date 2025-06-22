import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const SpecialFood = () => {
  return (
    <section className="relative h-96 w-full">
      <Image
        src={"/assets/images/landing/special-bg.png"}
        alt="special section background"
        fill
        quality={100}
      />
      <div className="absolute top-0 flex h-full w-full bg-black/30 px-32">
        <div className="flex h-full w-1/2 flex-col justify-center gap-8">
          <div className="flex flex-col gap-3 text-white">
            <p className="text-primary">50% OFF</p>
            <p className="text-5xl font-bold">TODAY SPECIAL FOOD</p>
            <p>
              The mouth-watering aroma of sizzling burgers now fills the streets
              thanks to the passionate pursuit of three brothers.
            </p>
            <p className="text-primary font-semibold">Limits Time Offer</p>
          </div>
          <Button className="w-fit text-base" size={"lg"}>
            Order Now
          </Button>
        </div>
        <div className="flex h-full w-1/2 px-24 py-10">
          <div className="relative h-full w-full">
            <Image
              src={"/assets/images/landing/special-offer.png"}
              fill
              alt="special food"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialFood;
