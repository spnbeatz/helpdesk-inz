"use client"

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { User } from "@/data/users";

import { useCurrentUser, UserData } from "@/hooks/auth/useCurrentUser";

import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  isLoading: boolean,
  activeLoggedUser: string,
  setActiveLoggedUser: Dispatch<SetStateAction<string>>
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

const userId = "USR-001"; // USR-005 - user, USR-002 - technician

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

  const [ activeLoggedUser, setActiveLoggedUser ] = useState<string>("USR-001")

  const {
    data: user,
    isLoading,
  } = useCurrentUser(activeLoggedUser);

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
        isLoading,
        activeLoggedUser,
        setActiveLoggedUser
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