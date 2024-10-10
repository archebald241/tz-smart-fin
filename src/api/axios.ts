import { notification } from "antd";
import axios from "axios";

declare module "axios" {
    export interface AxiosInstance {
        request<T = unknown>(config: AxiosRequestConfig): Promise<T>;
        get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
        delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
        head<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
        post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
        put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
        patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
    }

    export interface AxiosError<T = unknown, D = any> extends Error {
        config?: InternalAxiosRequestConfig<D>;
        code?: string;
        request?: any;
        response?: AxiosResponse<T, D>;
        isAxiosError: boolean;
        toJSON: () => object;
        data: {
            status: number;
            message: string;
            description?: string;
        };
    }
}

const axiosInstance = axios.create({
    baseURL: "https://my-json-server.typicode.com/archebald241/tz-smart-fin",
});

axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error(error);
        notification.error({
            message: "Упс! Что-то пошло не так",
            description: `При запросе ${error.config?.method} ${error.config?.url} произошла ошибка ${error.response?.status}`,
            placement: "bottomRight",
        });
        return Promise.reject(error);
    },
);

export default axiosInstance;
