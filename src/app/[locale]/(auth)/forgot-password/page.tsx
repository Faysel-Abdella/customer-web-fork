import React from "react";

import { ArrowLeft } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className='relative max-md:h-dvh max-md:rounded-none w-fit bg-background rounded-xl  flex justify-center '>
      <Link href={"/login"}>
        <ArrowLeft className='absolute m-5  text-primary' />
      </Link>

      <div className='w-full  h-full flex justify-center items-center p-10 '>
        <ForgotPasswordForm className='max-w-sm' />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
