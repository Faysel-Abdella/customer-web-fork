"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext"; // Import our custom hook
import { Loader2 } from "lucide-react";

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
      <div className="flex h-dvh w-screen flex-col items-center justify-center">
        <Loader2 size={50} className="animate-spin" />
      </div>
    ); // Or a dedicated loader component
  }

  return <>{children}</>;
}
