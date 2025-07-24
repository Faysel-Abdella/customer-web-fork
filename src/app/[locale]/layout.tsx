import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import LocationProvider from "@/contexts/LocationContext";
import { routing } from "@/i18n/routing";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Time delivery: Your Favourite Food Delivered Hot & Fresh",
  description:
    "Get your favorite meals from top local restaurants in delivered to your door. With Time delivery, browse menus, place orders online, and enjoy food quickly!",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={` ${poppins.className} antialiased`}>
        <NextIntlClientProvider>
          <AuthProvider>
            <LocationProvider>
              <CartProvider>
                <ThemeProvider
                  attribute={"class"}
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  {children}
                  <Toaster richColors />
                </ThemeProvider>
              </CartProvider>
            </LocationProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
