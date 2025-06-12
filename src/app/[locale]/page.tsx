import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div className='flex gap-10 p-10'>
      <div>
        <h1 className='text-3xl'>{t("title")}</h1>
        <Link href='/about'>{t("about")}</Link>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
}
