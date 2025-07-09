"use client";
import React, { PropsWithChildren } from "react";

import { useRouter } from "@/i18n/navigation";

import { Button } from "./ui/button";

const BackButton = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  return (
    <Button variant={"ghost"} onClick={() => router.back()}>
      {children}
    </Button>
  );
};

export default BackButton;
