"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ItemCardImageProps {
  imgUrl: string;
  imgTitle: string;
}
const ItemCardImage = ({ imgTitle, imgUrl }: ItemCardImageProps) => {
  const placeholderImage = "/assets/images/foodPlaceholder.jpg";
  const [imgSrc, setImgSrc] = useState(imgUrl);
  useEffect(() => {
    setImgSrc(imgUrl || placeholderImage);
  }, [imgUrl]);
  return (
    <Image
      src={imgSrc}
      alt={imgTitle}
      fill
      className="object-fill transition-transform duration-500 group-hover:scale-110"
      onError={() => {
        setImgSrc(placeholderImage);
      }}
    />
  );
};

export default ItemCardImage;
