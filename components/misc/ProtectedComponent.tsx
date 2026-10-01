import { useAuth } from "@/providers/auth.provider"

export const ProtectedComponent = ({
    children,
    roles,
}: {
    children: React.ReactNode;
    roles: string[];
}) => {
    const { user } = useAuth();

    const hasAccess = user?.role.some((role) =>
        roles.includes(role)
    );

    if (!hasAccess) {
        return null;
    }

    return <>{children}</>;
};