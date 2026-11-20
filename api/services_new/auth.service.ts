import { User } from "@/data/users";
import { IApiClient } from "../interfaces/config/apiClient.interface";
import { IAuthService } from "../interfaces/services/auth.interface";
import { users } from "@/data/users"

export class AuthService implements IAuthService {

    private endpoint: string = "auth";

    constructor(
        private readonly api: IApiClient
    ){}

    async getLoggedUser(userId: string): Promise<User | undefined> {
            const loggedUser = users.find((user) => user.id === userId);
            return loggedUser;
    }
}