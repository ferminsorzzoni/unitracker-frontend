import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function Header() {
    const token = useAuthStore(state => state.token);

    return (
        <header className="flex justify-between items-center border-b border-gray-mid p-2">

            <Link to="/dashboard" className="flex items-center">
                <img src="/logos/unitracker.svg" alt="" className="w-12 h-12" />
                <h1 className="text-4xl font-medium">Unitracker</h1>
            </Link>

            {token ? (
                <></>
            ) : (
                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="text-sm text-gray-dark hover:text-primary transition-colors"
                    >
                        Iniciar sesión
                    </Link>
                    <Link
                        to="/register"
                        className="text-sm border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary-light transition-colors"
                    >
                        Registrarse
                    </Link>
                </div>
            )}

        </header>
    );
}