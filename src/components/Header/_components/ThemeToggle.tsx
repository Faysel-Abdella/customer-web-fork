"use client";

import { useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeaderThemeToggle({
  className,
}: React.ComponentProps<"button">) {
  const [mounted, setMounted] = useState(false);

  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "text-foreground hover:bg-secondary hover:text-secondary-foreground relative flex size-10 cursor-pointer items-center justify-center transition-all hover:rounded-lg",
        className,
      )}
      onClick={() => {
        if (resolvedTheme == "light") {
          setTheme("dark");
        } else if (resolvedTheme === "dark") {
          setTheme("light");
        }
      }}
    >
      {resolvedTheme == "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      ) : (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      )}

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
