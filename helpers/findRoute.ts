import { appRoutes } from "@/config/appRoutes";

const matchRoute = (routePath: string, pathname: string) => {
    if (routePath === "/") {
        return pathname === "/";
    }

    const pattern = routePath
        .replace(/\[.*?\]/g, "[^/]+");

    const regex = new RegExp(`^${pattern}(?:/.*)?$`);

    return regex.test(pathname);
};

export const findAppRoute = (pathname: string) => {
    return appRoutes
        .filter((route) =>
            matchRoute(route.path, pathname)
        )
        .sort((a, b) => b.path.length - a.path.length)[0];
};