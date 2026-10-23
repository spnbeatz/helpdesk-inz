import { getLoggedUser } from "@/api/services/auth.service"
import { useQuery } from "@tanstack/react-query"

type ReturnTypeLocal = {
    data: UserData,
    isLoading: boolean
}

export type UserData = {
    id: string,
    email: string,
    role: string[],
    permissions: string[],
    avatar: string
}

export const useCurrentUser = (id: string) => {
    
    return useQuery({
        queryKey: ["authuser", id],
        queryFn: () => getLoggedUser(id),
        enabled: !!id
    })
}

const adminUser: UserData = {
    id: "USR-001",
    email: "admin@helpdesk.com",
    role: ["Administrator"],
    avatar: "https://tse1.explicit.bing.net/th/id/OIP.UirWc-_agU3sLXPag8vCUQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    permissions: [
        "tickets.view",
        "tickets.create",
        "tickets.edit",
        "tickets.delete",

        "users.view",
        "users.create",
        "users.edit",
        "users.delete",

        "equipment.view",
        "equipment.create",
        "equipment.edit",
        "equipment.delete"
    ]
}

const customerUser: UserData = {
    id: "USR-005",
    email: "user@helpdesk.com",
    role: ["User"],
    avatar: "https://tse1.explicit.bing.net/th/id/OIP.UirWc-_agU3sLXPag8vCUQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    permissions: [
        "tickets.view",
        "tickets.create",

        "equipment.view",
    ]
}