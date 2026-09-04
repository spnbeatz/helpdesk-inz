"use client";

import { useAuth } from "@/providers/auth.provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }


  return <>{children}</>;
};