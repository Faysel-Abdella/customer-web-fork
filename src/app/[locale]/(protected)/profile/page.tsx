import { Metadata } from "next";

import DeliveryInfo from "./_components/DeliveryInfo";
import PersonalInfo from "./_components/PersonalInfo";

export const metadata: Metadata = {
  title: "Your Profile| Time delivery",
  description:
    "Manage your Time-Delivery account details, including your name, contact information, and preferences.",
};

const ProfilePage = () => {
  return (
    <div className="w-full space-y-5 px-0 py-5 pb-10 md:px-10">
      <PersonalInfo />
      <DeliveryInfo />
    </div>
  );
};

export default ProfilePage;
