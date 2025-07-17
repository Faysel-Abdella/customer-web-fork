"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface DishCardImageProps {
  imgUrl: string;
  title: string;
  className?: string;
}
const DishCardImage = ({ imgUrl, title, className }: DishCardImageProps) => {
  const placeholderImage = "/assets/images/foodPlaceholder.jpg";
  const [imgSrc, setImgSrc] = useState(imgUrl || placeholderImage);

  useEffect(() => {
    setImgSrc(imgUrl || placeholderImage);
  }, [imgUrl]);
  return (
    <Image
      src={imgSrc}
      alt={`${title} image`}
      fill
      className={cn(
        "object-cover transition-transform duration-300 group-hover:scale-105",
        className,
      )}
      onError={() => {
        setImgSrc(placeholderImage);
      }}
    />
  );
};

export default DishCardImage;
