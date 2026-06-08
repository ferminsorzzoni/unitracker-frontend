import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

export default function HeaderHomeButton() {
    const token = useAuthStore(state => state.token);

    return (
        <Link to={token ? "/dashboard" : "/"} className="flex items-center" title="Home">
            <img src="/logos/unitracker.svg" alt="" className="w-7 h-7 sm:w-12 sm:h-12" />
            <h1 className="text-2xl sm:text-4xl font-medium text-gray-dark">Unitracker</h1>
        </Link>
    );
}