import { Link } from "react-router-dom";

export default function HeaderHomeButton() {
    return (
        <Link to="/dashboard" className="flex items-center">
            <img src="/logos/unitracker.svg" alt="" className="w-12 h-12" />
            <h1 className="text-4xl font-medium">Unitracker</h1>
        </Link>
    );
}