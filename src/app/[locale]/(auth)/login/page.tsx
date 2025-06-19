import { LoginForm } from "./_components/LoginForm";

const LoginPage = () => {
  return (
    <div className="bg-background flex w-fit justify-center rounded-xl p-10 max-sm:min-h-dvh max-sm:w-full max-sm:rounded-none">
      <LoginForm className="max-w-sm" />
    </div>
  );
};

export default LoginPage;
