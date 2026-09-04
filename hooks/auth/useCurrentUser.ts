type ReturnTypeLocal = {
    data: UserData,
    isLoading: boolean
}

export type UserData = {
    email: string,
    role: string[],
    avatar: string
}

export const useCurrentUser = (): ReturnTypeLocal => {
    return {
        data: { 
            email: "admin@helpdesk.com",
            role: ["admin"],
            avatar: "https://tse1.explicit.bing.net/th/id/OIP.UirWc-_agU3sLXPag8vCUQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
        },
        isLoading: false
    }

}