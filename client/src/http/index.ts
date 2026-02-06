import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { apiURL, removeTokens } from "./helper";
import { refreshToken } from "./userAPI";

const api = axios.create({
    baseURL: apiURL
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken')
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { 
            _retry?: boolean,
            _skipAuth?: boolean
        }

        if (originalRequest._skipAuth || 
            originalRequest.url?.includes('/refresh') ||
            originalRequest.url?.includes('/login')) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !isRefreshing
        ) {
                
            originalRequest._retry = true
            isRefreshing = true
            
            try {
                const data = await refreshToken();

                if (!data) {
                    throw new Error("Refresh failed")
                }
                
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
                }
                
                return api(originalRequest)
            } catch (refreshError) {
                removeTokens()

                if (refreshError instanceof Error && refreshError.message === "Refresh failed") {
                    return Promise.reject(error)
                }

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }
        
        return Promise.reject(error)
    }
);

export { api }