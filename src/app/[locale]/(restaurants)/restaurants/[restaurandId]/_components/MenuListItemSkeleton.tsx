import React from "react";

import { Card, CardContent } from "@/components/ui/card";

export const MenuListItemSkeleton = () => {
  return (
    <Card className="animate-pulse overflow-hidden border py-0 shadow-none">
      <CardContent className="p-0">
        <div className="flex max-md:flex-col">
          <div className="relative h-48 w-full md:w-52">
            <div className="h-full w-full bg-gray-200 md:rounded-l-xl dark:bg-gray-700"></div>
          </div>

          <div className="flex w-full flex-col justify-between p-3 md:px-4 md:py-2">
            <div className="mb-3 flex items-start justify-between">
              <div className="w-full">
                <div className="mb-2 h-6 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                <div className="mt-3 h-5 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="ml-4 w-fit min-w-fit">
                <div className="h-8 w-16 rounded-md bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>

            <div className="mb-4 h-4 w-32 rounded-md bg-gray-200 dark:bg-gray-700"></div>

            <div className="flex items-center justify-between">
              <div className="h-4 w-28 rounded-md bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-10 w-24 rounded-md bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
