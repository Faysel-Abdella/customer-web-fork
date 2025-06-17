import { AuthProvider } from "@/contexts/AuthContext";
import React, { PropsWithChildren } from "react";

const UserPagesLayout = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <div>{children}</div>
    </AuthProvider>
  );
};

export default UserPagesLayout;
