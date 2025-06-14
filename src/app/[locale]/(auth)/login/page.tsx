import { LoginForm } from "./_components/LoginForm";

const LoginPage = () => {
  return (
    <div className=' w-fit   max-sm:min-h-dvh max-sm:w-full max-sm:rounded-none bg-background rounded-xl p-10 flex justify-center '>
      <LoginForm className='max-w-sm' />
    </div>
  );
};

export default LoginPage;
