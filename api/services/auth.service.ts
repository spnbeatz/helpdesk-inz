import { users } from "@/data/users"

export const getLoggedUser = (userId: string) => {
    const loggedUser = users.find((user) => user.id === userId);
    return loggedUser;
}