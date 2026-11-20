import { ApiConfig } from "../interfaces/config/apiConfig.interface";

export const apiConfig: ApiConfig = {
    baseUrl: process.env.NEXT_PUBLIC_API_URL!,
    credentials: "include",
    headers: {
        Accept: "application/json",
    },
};