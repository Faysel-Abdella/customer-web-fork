import React from "react";
import ProfileSetupForm from "./_components/ProfileSetupForm";

const ProfileSetupPage = () => {
  return (
    <div className=' w-fit   max-sm:min-h-dvh max-sm:w-full max-sm:rounded-none bg-background rounded-xl p-10 flex justify-center '>
      <ProfileSetupForm className='sm:w-sm' />
    </div>
  );
};

export default ProfileSetupPage;
