import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Landing from "../pages/Landing";
import Career from "../pages/careers/Career";
import EditCareer from "../pages/careers/EditCareer";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import PublicRoute from "../components/PublicRoute";
import Privacy from "../pages/Privacy";
import Dashboard from "../pages/Dashboard";
import { AuthCallback } from "../pages/AuthCallback";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />

            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<Layout />}>
                <Route path="/privacy" element={<Privacy />} />

                <Route element={<PublicRoute />}>
                    <Route path="/" element={<Landing />} />
                </Route>
                
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/careers/:careerId" element={<Career />} />
                    <Route path="/careers/:careerId/edit" element={<EditCareer />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}