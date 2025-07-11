import React from "react";

const MenuItemDetailSkeleton: React.FC = () => {
  return (
    // Mimics DialogContent structure. Adjust className if this is wrapped by DialogContent.
    <div className="w-full">
      {/* Dialog Header Placeholder */}
      <div className="sr-only">
        {/* sr-only because the actual title/description are visually hidden */}
        <div className="bg-border mb-2 h-6 w-3/4 rounded"></div>
        <div className="bg-border h-4 w-1/2 rounded"></div>
      </div>

      <div className="relative">
        {/* Badge Placeholder */}
        <div className="absolute top-5 left-5 z-10 h-6 w-20 rounded-full bg-green-500/50"></div>

        {/* Carousel Placeholder */}
        <div className="p-2">
          <div className="bg-border flex h-80 w-full items-center justify-center overflow-hidden rounded-lg pr-0"></div>
          {/* Carousel Navigation Placeholders */}
        </div>

        {/* Content Details Section */}
        <div className="space-y-4 p-2">
          {/* Title, Favourite Button, Cuisine Type, Rating, Cook Time, Price */}
          <div className="space-y-2 border-b pb-2">
            <div className="flex w-full items-center justify-between">
              {/* Title Placeholder */}
              <div className="bg-border h-6 w-3/5 rounded"></div>
              {/* Heart Button Placeholder */}
              <div className="bg-border h-9 w-9 rounded-full"></div>
            </div>

            {/* Cuisine Type Badge Placeholder */}
            <div className="bg-border mb-2 h-6 w-28 rounded-full"></div>

            <div className="flex items-center justify-between">
              <div className="flex gap-5">
                {/* Rating Placeholder */}
                <div className="flex items-center gap-2">
                  <div className="bg-border h-4 w-20 rounded"></div>{" "}
                  {/* Stars and rating number */}
                </div>
                {/* Cook Time Placeholder */}
                <div className="flex items-center gap-1">
                  <div className="bg-border h-4 w-24 rounded"></div>{" "}
                  {/* Clock icon and time */}
                </div>
              </div>
              {/* Price Placeholder */}
              <div className="bg-border h-6 w-20 rounded"></div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2 border-b pb-4">
            <div className="bg-border h-5 w-1/4 rounded font-bold"></div>{" "}
            {/* "Description" title */}
            <div className="text-muted-foreground space-y-1">
              <div className="bg-border h-4 w-full rounded"></div>
              <div className="bg-border h-4 w-11/12 rounded"></div>
              <div className="bg-border h-4 w-3/4 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Footer Placeholder */}
      <div className="px-2 pt-4">
        {" "}
        {/* Added pt-4 to separate from content */}
        <div className="w-full space-y-4">
          {/* Quantity Section */}
          <div className="space-y-4">
            <div className="bg-border h-4 w-20 rounded"></div>{" "}
            {/* "Quantity:" text */}
            <div className="flex items-center gap-2">
              <div className="bg-border h-10 w-10 rounded-full"></div>{" "}
              {/* Minus button */}
              <div className="bg-border h-10 w-28 rounded"></div>{" "}
              {/* Input field */}
              <div className="bg-border h-10 w-10 rounded-full"></div>{" "}
              {/* Plus button */}
            </div>
          </div>

          {/* Price Summary Section */}
          <div className="border-primary flex justify-between rounded-lg border p-2">
            <div className="space-y-2">
              <div className="bg-border h-4 w-24 rounded"></div>{" "}
              {/* Item price label */}
              <div className="bg-border h-4 w-28 rounded"></div>{" "}
              {/* Add-on price label */}
              <div className="bg-border h-5 w-32 rounded"></div>{" "}
              {/* Total price label */}
            </div>
            <div className="space-y-2 text-right">
              <div className="bg-border h-4 w-16 rounded"></div>{" "}
              {/* Item price value */}
              <div className="bg-border h-4 w-16 rounded"></div>{" "}
              {/* Add-on price value */}
              <div className="bg-border h-5 w-20 rounded"></div>{" "}
              {/* Total price value */}
            </div>
          </div>

          {/* Add to Cart Button Placeholder */}
          <div className="bg-border h-10 w-full rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetailSkeleton;
