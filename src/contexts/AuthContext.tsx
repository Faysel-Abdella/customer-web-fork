"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useRouter } from "@/i18n/navigation";
import { UserDetail } from "@/types/auth.types";

interface AuthContextType {
  user: UserDetail | null;
  login: (userData: UserDetail, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const login = (userData: UserDetail, token: string) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", token);

    router.push("/home");
  };

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    router.push("/login");
  }, [router]);

  const value = {
    user,
    login,
    logout,
    isLoading,
  };
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem("accessToken");
      const storedUserJSON = localStorage.getItem("user");

      if (storedToken && storedUserJSON) {
        try {
          const userFromStorage = JSON.parse(storedUserJSON);
          setUser(userFromStorage);
        } catch (error) {
          console.error("Failed to parse user data from localStorage.", error);
          setUser(null);
          localStorage.clear();
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
