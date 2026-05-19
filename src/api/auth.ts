import api from "./../lib/axios";
import type { LoginRequestDTO, LoginResponseDTO, RefreshAccessResponseDTO, RegisterRequestDTO, RegisterResponseDTO } from "./../types/auth";

async function register(body: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const { data } = await api.post<RegisterResponseDTO>("/auth/register", body);
    return data;
}

async function login(body: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { data } = await api.post<LoginResponseDTO>("/auth/login", body);
    return data;
}

async function refresh(): Promise<RefreshAccessResponseDTO> {
    const { data } = await api.post<RefreshAccessResponseDTO>("/auth/refresh", {}, {
        withCredentials: true,
    });
    return data;
}

async function logout() {
    return api.post("/auth/logout", {}, {
        withCredentials: true,
    });
}

export { register, login, refresh, logout };