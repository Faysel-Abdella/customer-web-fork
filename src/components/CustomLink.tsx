import { Link } from "@/i18n/navigation";

interface CustomLinkProps {
  href: string;
  prefetch?: boolean;
}
export default function CustomLink({ href }: CustomLinkProps) {
  return <Link href={href} prefetch={false} />;
}
