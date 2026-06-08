import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function PrivateRoute() {
    const token = useAuthStore(state => state.token);

    console.log("Priveateroute", token);
    return token ? <Outlet /> : <Navigate to ="/login" />
}