// "use client";
// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// type AuthStatus = "pending" | "authenticated" | "unauthenticated";
// export interface User {
//   id: string;
//   name: string;
//   email: string;
// }
// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
// }
// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   useEffect(() => {
//     async function getCurrentUser() {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const result = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );
//         if (!result.ok) {
//           setUser(null);
//           setIsAuthenticated(false);
//           throw new Error("Unable to verify authentication.");
//         }
//         const data = await result.json();
//         setUser(data.user);
//         setIsAuthenticated(true);
//       } catch (error) {
//         console.log("Auth error", error);
//         setUser(null);
//         setIsAuthenticated(false);
//       }
//     }
//     getCurrentUser();
//   }, []);
//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === null) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// }

"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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

        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          },
        );

        if (!result.ok) {
          if (result.status === 401) {
            localStorage.removeItem("accessToken");
          }

          setUser(null);
          setStatus("unauthenticated");
          return;
        }

        const data = await result.json();

        setUser(data.user);
        setStatus("authenticated");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error("Authentication error:", error);
        setUser(null);
        setStatus("unauthenticated");
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
