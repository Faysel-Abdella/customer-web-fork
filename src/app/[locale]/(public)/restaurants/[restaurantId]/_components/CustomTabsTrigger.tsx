"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import { TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "@/i18n/navigation";

interface CustomTabsTriggerProps {
  value: string;
  title: string;
  className?: string;
}
const CustomTabsTrigger = ({
  value,
  title,
  className,
}: CustomTabsTriggerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const param = new URLSearchParams(searchParams.toString());
    param.set("tab", value);

    router.replace({
      pathname,
      query: Object.fromEntries(param.entries()),
    });
  };
  return (
    <TabsTrigger value={value} onClick={handleClick} className={className}>
      {title}
    </TabsTrigger>
  );
};

export default CustomTabsTrigger;
