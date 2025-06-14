import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import OTPForm from "./_components/OTPForm";

const VerifyOTPPage = () => {
  return (
    <div className='relative max-md:h-dvh max-md:rounded-none w-fit bg-background rounded-xl  flex justify-center '>
      <Link href={"/login"}>
        <ArrowLeft className='absolute m-5  text-primary' />
      </Link>

      <div className='w-full  h-full flex justify-center items-center p-10 '>
        <OTPForm className='max-w-sm' />
      </div>
    </div>
  );
};

export default VerifyOTPPage;
