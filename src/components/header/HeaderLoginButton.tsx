import { Link } from "react-router-dom";

export default function HeaderLoginButton() {
    return (
        <Link
            to="/login"
            className="text-sm text-gray-dark hover:text-primary transition-colors"
        >
            Iniciar sesión
        </Link>
    );
}