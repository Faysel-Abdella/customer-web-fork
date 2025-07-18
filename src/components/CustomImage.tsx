"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface CustomImageProps {
  imgUrl: string;
  title: string;
  placeholderImage: string;
  className?: string;
}
const CustomImage = ({
  imgUrl,
  title,
  className,
  placeholderImage,
}: CustomImageProps) => {
  const [imgSrc, setImgSrc] = useState(imgUrl || placeholderImage);

  useEffect(() => {
    setImgSrc(imgUrl || placeholderImage);
  }, [imgUrl, placeholderImage]);
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

export default CustomImage;
