import { useAuth } from "@/providers/auth.provider"

export const ProtectedComponent = ({
    children,
    permission,
}: {
    children: React.ReactNode;
    permission: string;
}) => {
    const { user } = useAuth();

    if (!user?.permissions.includes(permission)) {
        return null;
    }

    return children;
};