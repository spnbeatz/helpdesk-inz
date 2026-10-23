"use client";

import {
    createContext,
    useContext,
    useEffect
} from "react";

import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/providers/auth.provider";
import { hasPathAccess } from "@/helpers/pathBlockedForRole";

type AccessContextType = {
    hasPermission: (permission: string) => boolean;
    hasRouteAccess: (pathname: string) => boolean;
    hasRole: (roles: string | string[]) => boolean;
};

const AccessContext = createContext<AccessContextType | null>(null);

export const AccessProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const pathname = usePathname();
    const router = useRouter();

    const { user } = useAuth();

    const hasPermission = (permission: string) => {
        return user?.permissions?.includes(permission) ?? false;
    };

    const hasRole = (roles: string | string[]): boolean => {
        if (!user) return false;

        const allowedRoles = Array.isArray(roles) ? roles : [roles];

        return user.roleNames.some(role => allowedRoles.includes(role));
    };

    const hasRouteAccess = (path: string) => {
        if (!user) return false;

        return hasPathAccess(
            user.roleNames,
            path
        );
    };

    const canAccessCurrentRoute =
        hasRouteAccess(pathname);

    useEffect(() => {
        if (user && !canAccessCurrentRoute) {
            router.replace("/forbidden");
        }
    }, [
        user,
        canAccessCurrentRoute,
        router
    ]);

    return (
        <AccessContext.Provider
            value={{
                hasPermission,
                hasRouteAccess,
                hasRole
            }}
        >
            {children}
        </AccessContext.Provider>
    );
};

export const useAccess = () => {
    const context = useContext(AccessContext);

    if (!context) {
        throw new Error(
            "useAccess must be used inside AccessProvider"
        );
    }

    return context;
};