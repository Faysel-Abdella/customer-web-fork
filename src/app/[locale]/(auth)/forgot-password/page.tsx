import React from "react";

import { ArrowLeft } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="bg-background relative flex w-fit justify-center rounded-xl max-md:h-dvh max-md:rounded-none">
      <Link href={"/login"}>
        <ArrowLeft className="text-primary absolute m-5" />
      </Link>

      <div className="flex h-full w-full items-center justify-center p-10">
        <ForgotPasswordForm className="max-w-sm" />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
