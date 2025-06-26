import Link from "next/link";

import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="parent-container bg-black text-white">
      <div className="container mx-auto py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo className="size-10 border-0 lg:size-12" />
              <p className="hover:text-primary text-1xl font-bold md:text-2xl lg:text-3xl">
                {t("about.brand_name")}
              </p>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("about.description")}
            </p>
            <div className="flex space-x-3">
              <Link
                href="#"
                className="hover:border-primary hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="hover:border-primary hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="hover:border-primary hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {t("explore.title")}
            </h3>
            <nav className="space-y-3">
              <Link
                href="/about-us"
                className="hover:text-primary text-muted-foreground block text-sm transition-colors"
              >
                {t("explore.links.about_us")}
              </Link>
              <Link
                href="/contact-us"
                className="hover:text-primary text-muted-foreground block text-sm transition-colors"
              >
                {t("explore.links.contact_us")}
              </Link>
              <Link
                href="/restaurants"
                className="hover:text-primary text-muted-foreground block text-sm transition-colors"
              >
                {t("explore.links.restaurant")}
              </Link>
              <Link
                href="#"
                className="hover:text-primary text-muted-foreground block text-sm transition-colors"
              >
                {t("explore.links.food_category")}
              </Link>
              <Link
                href="#"
                className="hover:text-primary text-muted-foreground block text-sm transition-colors"
              >
                {t("explore.links.help_center")}
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {t("contact.title")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-600">
                  <MapPin className="text-muted-foreground h-4 w-4" />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-600">
                  <Phone className="text-muted-foreground h-4 w-4" />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-600">
                  <Mail className="text-muted-foreground h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {t("newsletter.title")}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("newsletter.description")}
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="focus:border-primary rounded-none border-t-0 border-r-0 border-b border-l-0 border-gray-600 bg-transparent px-0 text-white placeholder:text-gray-400 focus-visible:ring-0"
              />
              <Button
                size="sm"
                className="bg-primary ml-2 rounded px-4 text-white hover:bg-orange-600"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-center text-sm text-gray-400 md:text-left">
              {t.rich("bottom_bar.copyright", {
                span: (chunk) => <span className="text-primary">{chunk}</span>,
              })}
              <Link href="#" className="text-primary hover:underline">
                ToXSL Technologies
              </Link>
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="hover:text-primary text-sm text-gray-400 transition-colors"
              >
                {t("bottom_bar.privacy_policy")}
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-sm text-blue-500 transition-colors hover:text-blue-400"
              >
                {t("bottom_bar.terms_and_conditions")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
