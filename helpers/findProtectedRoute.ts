import { protectedRoutes } from "@/config/protectedRoutes";

export const findProtectedRoute = (pathname: string) => {
    return protectedRoutes
        .filter((route) =>
            pathname === route.path ||
            pathname.startsWith(`${route.path}/`)
        )
        .sort((a, b) => b.path.length - a.path.length)[0];
};