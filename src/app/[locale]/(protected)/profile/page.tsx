import { Metadata } from "next";

import PersonalInfo from "./_components/PersonalInfo";

export const metadata: Metadata = {
  title: "Your Profile| Time delivery",
  description:
    "Manage your Time-Delivery account details, including your name, contact information, and preferences.",
};

const ProfilePage = () => {
  return (
    <div className="w-full">
      <PersonalInfo />
    </div>
  );
};

export default ProfilePage;
