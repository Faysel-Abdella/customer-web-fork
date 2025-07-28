import { Link } from "@/i18n/navigation";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
export default function CustomLink({
  href,
  children,
  className,
}: CustomLinkProps) {
  return (
    <Link href={href} prefetch={false} className={className}>
      {children}
    </Link>
  );
}
