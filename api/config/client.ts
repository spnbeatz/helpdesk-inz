
import { ApiConfig } from "../interfaces/config/apiConfig.interface";
import { IApiClient } from "../interfaces/config/apiClient.interface";
import { ApiError } from "./error";

export class ApiClient implements IApiClient {
    constructor(
        private readonly config: ApiConfig
    ) {}

    async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = this.buildUrl(endpoint);

        const headers = new Headers(this.config.headers);

        new Headers(options.headers).forEach((value, key) => {
            headers.set(key, value);
        });

        const response = await fetch(url, {
            ...options,
            headers,
            credentials:
                options.credentials ??
                this.config.credentials ??
                "include",
        });

        // Obsługa pustej odpowiedzi
        if (response.status === 204 || response.status === 205) {
            if (!response.ok) {
                throw new ApiError(
                    `HTTP Error: ${response.status}`,
                    response.status
                );
            }

            return undefined as T;
        }

        const responseText = await response.text();

        let body: unknown;

        if (responseText) {
            try {
                body = JSON.parse(responseText);
            } catch {
                body = responseText;
            }
        }

        // Obsługa błędów HTTP
        if (!response.ok) {
            const message = this.getErrorMessage(
                body,
                response.status,
                response.statusText
            );

            throw new ApiError(
                message,
                response.status,
                body
            );
        }

        return body as T;
    }

    async get<T>(
        endpoint: string,
        filters?: object
    ): Promise<T> {
        const query = this.buildQuery(filters);

        const separator = endpoint.includes("?") ? "&" : "?";

        return this.request<T>(
            `${endpoint}${query ? separator + query : ""}`,
            { method: "GET" }
        );
    }

    async post<T>(
        endpoint: string,
        data?: unknown
    ): Promise<T> {
        return this.sendJson<T>("POST", endpoint, data);
    }

    async put<T>(
        endpoint: string,
        data?: unknown
    ): Promise<T> {
        return this.sendJson<T>("PUT", endpoint, data);
    }

    async patch<T>(
        endpoint: string,
        data?: unknown
    ): Promise<T> {
        return this.sendJson<T>("PATCH", endpoint, data);
    }

    async delete<T>(
        endpoint: string
    ): Promise<T> {
        return this.request<T>(endpoint, {
            method: "DELETE",
        });
    }

    async postFormData<T>(
        endpoint: string,
        data: FormData
    ): Promise<T> {
        return this.request<T>(endpoint, {
            method: "POST",
            body: data,
        });
    }

    async putFormData<T>(
        endpoint: string,
        data: FormData
    ): Promise<T> {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: data,
        });
    }

    private async sendJson<T>(
        method: string,
        endpoint: string,
        data?: unknown
    ): Promise<T> {
        return this.request<T>(endpoint, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: data !== undefined
                ? JSON.stringify(data)
                : undefined,
        });
    }

    private buildUrl(endpoint: string): string {
        const baseUrl = this.config.baseUrl.replace(/\/+$/, "");
        const path = endpoint.replace(/^\/+/, "");

        return `${baseUrl}/${path}`;
    }

    private buildQuery(filters?: object): string {
        if (!filters) return "";

        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (
                value === undefined ||
                value === null ||
                value === ""
            ) {
                return;
            }

            if (Array.isArray(value)) {
                value.forEach(item => {
                    if (item !== undefined && item !== null) {
                        params.append(
                            key,
                            this.serializeValue(item)
                        );
                    }
                });

                return;
            }

            params.append(key, this.serializeValue(value));
        });

        return params.toString();
    }

    private serializeValue(value: unknown): string {
        if (value instanceof Date) {
            return value.toISOString();
        }

        if (typeof value === "object") {
            return JSON.stringify(value);
        }

        return String(value);
    }

    private getErrorMessage(
        body: unknown,
        status: number,
        statusText: string
    ): string {
        if (body && typeof body === "object") {
            const error = body as Record<string, unknown>;

            if (typeof error.message === "string") {
                return error.message;
            }

            if (typeof error.detail === "string") {
                return error.detail;
            }

            if (typeof error.title === "string") {
                return error.title;
            }
        }

        return `HTTP Error: ${status} ${statusText}`;
    }
}
