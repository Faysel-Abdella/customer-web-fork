import { Copy } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

interface CopiableTextProps {
  text: string;
  title: string;
  className?: string;
}
const CopiableText = ({ text, title, className }: CopiableTextProps) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast(`${title} copied to clipboard!`);
      })
      .catch((err) => {
        toast.error(`Failed to copy ${title}: ${err}`);
      });
  };
  return (
    <button
      className={cn(
        "text-secondary-foreground flex items-center gap-2 px-2 py-1 font-medium",
        className,
      )}
      onClick={handleCopy}
    >
      {text}
      <Copy size={14} />
    </button>
  );
};

export default CopiableText;
