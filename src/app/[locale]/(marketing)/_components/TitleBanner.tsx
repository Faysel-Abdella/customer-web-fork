import React from "react";

interface TitleBannerProps {
  title: string;
  className?: string;
}
const TitleBanner = ({ title }: TitleBannerProps) => {
  return (
    <div className="h-72 w-full bg-[url('/assets/images/banner.jpg')] bg-cover">
      <div className="parent-container flex h-full w-full items-center bg-black/50">
        <p className="text-4xl font-bold md:text-5xl">{title}</p>
      </div>
    </div>
  );
};

export default TitleBanner;
