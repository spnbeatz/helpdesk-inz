"use client";

import { Card } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { protectedRoutes } from "@/config/protectedRoutes";
import { findProtectedRoute } from "@/helpers/findProtectedRoute";

import { useAuth } from "@/providers/auth.provider";


export const Screen = ({
    children
}: {
    children: React.ReactNode;
}) => {

    const pathname = usePathname();
    const router = useRouter();

    const { user } = useAuth();

    const route = protectedRoutes
        .filter((route) =>
            pathname === route.path ||
            pathname.startsWith(`${route.path}/`)
        )
        .sort((a, b) => b.path.length - a.path.length)[0];

    const hasAccess =
        !route ||
        route.roles.some((role) =>
            user?.role.includes(role)
        );

    useEffect(() => {
        if (user && !hasAccess) {
            router.replace("/forbidden");
        }
    }, [user, hasAccess, router]);

    if (!user || !hasAccess) {
        return null;
    }

    return (
        <div className="w-full h-full py-2 pr-2">
            <Card className="rounded-lg h-full bg-white/90">
                <div className="w-full h-full p-4">
                    {children}
                </div>
            </Card>
        </div>
    );
};