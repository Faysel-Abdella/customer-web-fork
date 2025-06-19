import LanguageSelector from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  return (
    <div className="flex gap-10 p-10">
      <div>
        <h1 className="text-3xl">Time Delivery</h1>
        <Link href="/about">About us</Link>
      </div>
      <div>
        <ThemeToggle />
        <LanguageSelector />
      </div>
    </div>
  );
}
