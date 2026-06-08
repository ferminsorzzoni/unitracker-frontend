import { useMutation } from "@tanstack/react-query";
import { login, logout, refresh, register } from "../api/auth";
import { handleUnexpectedError } from "../utils/error";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

function useRegister() {
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: register,
        onSuccess: ({ accessToken, user }) => {
            setAuth(user, accessToken);
            navigate("/dashboard")
        },
        onError: (error) => handleUnexpectedError(error, [409])
    });
}

function useLogin() {
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: login,
        onSuccess: ({ accessToken, user }) => {
            setAuth(user, accessToken);
            navigate("/dashboard");
        },
        onError: (error) => handleUnexpectedError(error, [401])
    });
}

function useRefresh() {
    const { setToken } = useAuthStore();
    return useMutation({
        mutationFn: refresh,
        onSuccess: ({ accessToken }) => {
            setToken(accessToken);
        },
        onError: (error) => handleUnexpectedError(error)
    });
}

function useLogout() {
    const { logout: logoutAuth } = useAuthStore();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            navigate("/", { replace: true });
            setTimeout(() => {
                logoutAuth();
            }, 0);
        },
        onError: (error) => handleUnexpectedError(error)
    });
}

export { useRegister, useLogin, useRefresh, useLogout };