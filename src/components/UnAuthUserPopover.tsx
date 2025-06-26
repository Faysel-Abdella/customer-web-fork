import React from "react";

import { User } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
const UnAuthUserPopover = ({ className }: React.ComponentProps<"div">) => {
  const t = useTranslations("header");

  return (
    <Popover>
      <PopoverTrigger className={cn("cursor-pointer", className)}>
        <User />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <p>{t("create_an_account")}</p>

        <Button asChild>
          <Link href={"/login"}>{t("login")}</Link>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UnAuthUserPopover;
