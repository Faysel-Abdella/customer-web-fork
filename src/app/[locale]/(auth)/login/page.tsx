import { Metadata } from "next";

import { LoginForm } from "./_components/LoginForm";

export const metadata: Metadata = {
  title: "Login to Your Account",
  description:
    "Sign in to your Time-Delivery account to reorder your favorite meals, track your delivery, and manage your profile.",
};

const LoginPage = () => {
  return (
    <div className="bg-background flex w-fit justify-center rounded-xl p-10 max-sm:min-h-dvh max-sm:w-full max-sm:rounded-none">
      <LoginForm className="max-w-sm" />
    </div>
  );
};

export default LoginPage;
