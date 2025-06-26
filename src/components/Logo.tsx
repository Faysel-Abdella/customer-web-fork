import Image from "next/image";

import { cn } from "@/lib/utils";

interface logoProps {
  className?: string;
}
const Logo = ({ className }: logoProps) => {
  return (
    <div
      className={cn(
        "relative flex size-16 items-center justify-center rounded-2xl border-2 border-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg",
        className,
      )}
    >
      <Image
        src={"/assets/images/logo.png"}
        alt="logo"
        fill
        priority
        quality={100}
      />
    </div>
  );
};

export default Logo;
