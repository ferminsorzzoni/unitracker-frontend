import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

export default function HeaderHomeButton() {
    const token = useAuthStore(state => state.token);

    return (
        <Link to={token ? "/dashboard" : "/"} className="flex items-center" title="Home">
            <img src="/logos/unitracker.svg" alt="" className="w-12 h-12 sm:w-8 sm:h-8" />
            <h1 className="text-4xl font-medium text-gray-dark sm:text-2xl">Unitracker</h1>
        </Link>
    );
}