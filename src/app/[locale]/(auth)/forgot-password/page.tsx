import React from "react";
import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

const ForgotPasswordPage = () => {
  return (
    <div className='relative'>
      <Link href={"/login"}>
        <ArrowLeft className='absolute m-5 text-primary' />
      </Link>
      <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
        <div className='w-full max-w-sm'>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
