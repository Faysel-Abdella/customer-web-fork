"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return; // Do nothing while loading.
    }

    if (!user) {
      router.push("/login");
    }

    if (user?.is_profile_setup === 0 && user.contact_no) {
      router.push("/profile-setup");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex h-dvh w-full items-center justify-center">
        <Loader2 size={50} className="animate-spin" />
      </div>
    ); // Or a dedicated loader component
  }

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
