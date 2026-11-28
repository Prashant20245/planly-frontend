"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

export type AuthStatus = "pending" | "authenticated" | "unauthenticated";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  setAuth: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Initially, we haven't verified authentication.
  const [status, setStatus] = useState<AuthStatus>("pending");

  useEffect(() => {
    const controller = new AbortController();

    async function getCurrentUser() {
      try {
        const token = localStorage.getItem("accessToken");

        // No token means the user is unauthenticated.
        if (!token) {
          setStatus("unauthenticated");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          },
        );

        const result = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            toast.error("Invalid email or password.");
            localStorage.removeItem("accessToken");
          } else if (response.status >= 500) {
            toast.error(
              "Something went wrong on our end. Please try again later.",
            );
          } else {
            toast.error(result.message || "Unable to sign in.");
          }

          setUser(null);
          setStatus("unauthenticated");
          return;
        }

        setUser(result.user);
        setStatus("authenticated");
        toast.success("Welcome back!");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error("Authentication error:", error);
        setUser(null);
        setStatus("unauthenticated");
        toast.error(
          "Unable to connect to the server. Please check your internet connection.",
        );
      }
    }

    getCurrentUser();

    return () => {
      controller.abort();
    };
  }, []);

  // Call this after successful login.
  function setAuth(user: User) {
    setUser(user);
    setStatus("authenticated");
  }

  // Call this during logout.
  function logout() {
    localStorage.removeItem("accessToken");
    setUser(null);
    setStatus("unauthenticated");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        isAuthenticated: status === "authenticated",
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
