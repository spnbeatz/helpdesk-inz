export interface IApiClient {
    get<T>(endpoint: string, filters?: object): Promise<T>;

    post<T>(endpoint: string, data?: unknown): Promise<T>;

    put<T>(endpoint: string, data?: unknown): Promise<T>;

    patch<T>(endpoint: string, data?: unknown): Promise<T>;

    delete<T>(endpoint: string): Promise<T>;

    postFormData<T>(endpoint: string, data: FormData): Promise<T>;

    putFormData<T>(endpoint: string, data: FormData): Promise<T>;
}