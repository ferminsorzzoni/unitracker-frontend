import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function PublicRoute() {
    const token = useAuthStore(state => state.token);
    return token ? <Navigate to="/dashboard" /> : <Outlet />
}