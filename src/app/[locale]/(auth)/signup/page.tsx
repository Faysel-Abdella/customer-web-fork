import React from "react";

import SignupForm from "./_components/SignupForm";

const SignupPage = () => {
  return (
    <div className="bg-background flex w-fit justify-center rounded-xl p-10 max-sm:min-h-dvh max-sm:w-full max-sm:rounded-none">
      <SignupForm className="max-w-sm" />
    </div>
  );
};

export default SignupPage;
