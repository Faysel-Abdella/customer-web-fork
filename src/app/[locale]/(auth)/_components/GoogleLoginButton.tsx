// components/FirebaseGoogleLoginButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useSocialSSO } from "@/hooks/authHooks/useSocialSSO";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "sonner";

export function GoogleLoginButton() {
  const { error, isLoading, isSuccess, login, user } = useSocialSSO({
    providerName: "google",
  });

  useEffect(() => {
    if (error) {
      toast.error("Error", { description: error });
    }
    if (isSuccess) {
      toast.success(`Welcome back ${user?.full_name}`);
    }
  }, [error, isSuccess, user]);

  return (
    <Button
      variant='outline'
      type='button'
      className='w-full'
      onClick={login}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className='animate-spin' />
      ) : (
        <Image
          src={"/assets/images/brand-icons/google.svg"}
          alt='google icon'
          width={20}
          height={20}
        />
      )}
    </Button>
  );
}
