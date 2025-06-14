import React from "react";

import SignupForm from "./_components/SignupForm";

const SignupPage = () => {
  return (
    <div className=' w-fit   max-sm:min-h-dvh max-sm:w-full max-sm:rounded-none bg-background rounded-xl p-10 flex justify-center '>
      <SignupForm className='max-w-sm' />
    </div>
  );
};

export default SignupPage;
