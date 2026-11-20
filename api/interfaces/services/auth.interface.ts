import { User } from "@/data/users";

export interface IAuthService {
    getLoggedUser(userId: string): Promise<User | undefined>
}