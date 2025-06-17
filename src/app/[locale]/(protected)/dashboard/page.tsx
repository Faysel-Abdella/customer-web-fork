"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  return (
    <div className='flex gap-5 p-10 items-center'>
      Welcome {user?.full_name}
      <Button onClick={() => logout()}>Log out</Button>
    </div>
  );
};

export default DashboardPage;
