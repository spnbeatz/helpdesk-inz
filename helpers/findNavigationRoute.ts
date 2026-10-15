import { NavigationRoutesType } from "@/config/navigation";

export const findNavigationRoute = (
    routes: NavigationRoutesType[],
    pathname: string
): NavigationRoutesType | undefined => {
    for (const route of routes) {
        if (route.href) {
            const matches =
                route.href === "/"
                    ? pathname === "/"
                    : pathname === route.href ||
                      pathname.startsWith(`${route.href}/`);

            if (matches) {
                return route;
            }
        }

        if (route.children) {
            const child = findNavigationRoute(
                route.children,
                pathname
            );

            if (child) {
                return child;
            }
        }
    }

    return undefined;
};