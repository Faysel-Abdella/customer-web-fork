import React from "react";
import { Metadata } from "next";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import OTPForm from "./_components/OTPForm";

export const metadata: Metadata = {
  title: "Verify Your Account | Time delivery",
  description:
    "Enter the one-time password (OTP) sent to your device to verify your account and complete your registration or login.",
};

const VerifyOTPPage = () => {
  return (
    <div className="bg-background relative flex w-fit justify-center rounded-xl max-md:h-dvh max-md:rounded-none">
      <Link href={"/signup"}>
        <ArrowLeft className="text-primary absolute m-5" />
      </Link>

      <div className="flex h-full w-full items-center justify-center p-10">
        <OTPForm className="max-w-sm" />
      </div>
    </div>
  );
};

export default VerifyOTPPage;
