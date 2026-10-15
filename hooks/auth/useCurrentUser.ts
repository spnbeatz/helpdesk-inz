type ReturnTypeLocal = {
    data: UserData,
    isLoading: boolean
}

export type UserData = {
    email: string,
    role: string[],
    permissions: string[],
    avatar: string
}

export const useCurrentUser = (): ReturnTypeLocal => {
    const isAdmin = false;
    return {
        data: isAdmin ? adminUser : customerUser,
        isLoading: false
    }

}

const adminUser: UserData = {
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
    email: "user@helpdesk.com",
    role: ["User"],
    avatar: "https://tse1.explicit.bing.net/th/id/OIP.UirWc-_agU3sLXPag8vCUQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    permissions: [
        "tickets.view",
        "tickets.create",

        "equipment.view",
    ]
}