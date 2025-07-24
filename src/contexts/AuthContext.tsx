"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import {
  checkAuth,
  clearTokenCookie,
  logoutAction,
} from "@/actions/auth.actions";
import { useRouter } from "@/i18n/navigation";
import { UserDetail } from "@/types/auth.types";

interface AuthContextType {
  user: UserDetail | null;
  login: (userData: UserDetail) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const router = useRouter();

  const login = (userData: UserDetail) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = useCallback(async () => {
    const { success, error } = await logoutAction();
    if (success) {
      setUser(null);
      localStorage.removeItem("user");
      await clearTokenCookie();
      router.push("/login");
    }
    if (error) {
      toast.error("Logout failed, Please try again");
    }
  }, [router]);

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated,
  };
  useEffect(() => {
    setIsLoading(true);
    const initializeAuth = async () => {
      const authStatus = await checkAuth();

      setIsAuthenticated(authStatus);

      if (!authStatus) {
        setIsLoading(false);
        return;
      }
      const storedUserJSON = localStorage.getItem("user");

      if (storedUserJSON) {
        try {
          const userFromStorage = JSON.parse(storedUserJSON);
          setUser(userFromStorage);
        } catch (error) {
          console.error("Failed to parse user data from localStorage.", error);
          setUser(null);
          localStorage.clear();
          logout();
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, [logout, isAuthenticated]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
