"use client";

import { ReactNode } from "react";
import { useAccess } from "@/providers/access.provider";

type RoleGuardProps = {
    roles: string | string[];
    children: ReactNode;
    fallback?: ReactNode;
};

export const RoleGuard = ({
    roles,
    children,
    fallback = null
}: RoleGuardProps) => {
    const { hasRole } = useAccess();

    if (!hasRole(roles)) return <>{fallback}</>;

    return <>{children}</>;
};