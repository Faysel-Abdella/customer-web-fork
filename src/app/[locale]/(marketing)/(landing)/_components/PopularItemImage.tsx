"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface PopularItemImageProps {
  imgUrl: string;
  imgTitle: string;
}
const PopularItemImage = ({ imgTitle, imgUrl }: PopularItemImageProps) => {
  const placeholderImage = "/assets/images/foodPlaceholder.jpg";
  const [imgSrc, setImgSrc] = useState(imgUrl);
  useEffect(() => {
    setImgSrc(imgUrl || placeholderImage);
  }, [imgUrl]);

  if (imgUrl == "")
    return (
      <Image
        src={placeholderImage}
        alt={imgTitle}
        fill
        className="rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-105"
        onError={() => {
          setImgSrc(placeholderImage);
        }}
      />
    );

  return (
    <Image
      src={imgSrc}
      alt={imgTitle}
      fill
      className="rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-105"
      onError={() => {
        setImgSrc(placeholderImage);
      }}
    />
  );
};

export default PopularItemImage;
