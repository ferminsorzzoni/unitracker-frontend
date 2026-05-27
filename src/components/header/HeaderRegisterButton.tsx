import { Link } from "react-router-dom";

export default function HeaderRegisterButton() {
    return (
        <Link
            to="/register"
            className="text-sm border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary-light transition-colors"
        >
            Registrarse
        </Link>
);
}