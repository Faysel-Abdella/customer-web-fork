import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-dvh w-full">
      <Image
        fill
        src={"/assets/images/landing/banner.jpg"}
        alt={"hero section banner"}
      />
      <div className="absolute top-0 flex h-full w-full items-center justify-center bg-black/60 px-32">
        <div className="flex w-1/2 flex-col gap-4 text-white">
          <h1 className="text-7xl font-bold">
            Your <span className="text-primary">Favourite Food</span> Delivered
            Hot & Fresh
          </h1>
          <p className="text-lg font-semibold">
            Experience the taste of home, anywhere you go. Our platform connects
            you with local restaurants that deliver hot, fresh food. Order
            online today!
          </p>
        </div>
        <div className="flex h-full w-1/2 items-center py-28">
          <div className="relative h-full w-full">
            <Image
              fill
              src={"/assets/images/landing/banner-img.png"}
              alt="banner image"
              quality={100}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
