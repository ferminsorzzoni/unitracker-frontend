import type { InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean,
}

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use(config => {
    const token = useAuthStore.getState().token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    response => response,
    async (error) => {
        const original = error.config as CustomAxiosRequestConfig;

        if(error.response?.status === 401 && !original._retry && !original.url?.includes("/auth")) {
            original._retry = true;

            try {
                const { data } = await api.post("/auth/refresh", {}, {
                    withCredentials: true,
                });

                useAuthStore.getState().setToken(data.accessToken);
                original.headers = original.headers ?? {};
                original.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(original);
            } catch(error) {
                useAuthStore.getState().logout();
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default api;