import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { useCurrentUser, UserData } from "@/hooks/auth/useCurrentUser";

import { useQueryClient } from "@tanstack/react-query";

type AuthContextType = {
  user: UserData | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  isLoading: boolean
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
  } = useCurrentUser();

  const handleLogout = async () => {
    console.log("logged out")
    queryClient.setQueryData(["currentUser"], null);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: !!user,
        logout: handleLogout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

function LoadingScreen() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}