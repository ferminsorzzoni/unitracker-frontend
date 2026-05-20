import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-gray-mid p-6">
            <div className="mx-auto flex items-center justify-between">

            <div className="flex items-center gap-2">
                <img src="/logos/unitracker.svg" alt="" className="w-6 h-6" />
                <span className="text-sm text-gray-mid">UniTracker © {new Date().getFullYear()}</span>
            </div>

            <div className="flex items-center gap-6">
                <Link to="/privacy" className="text-sm text-gray-mid hover:text-primary transition-colors">
                    Privacidad
                </Link>
                <a href="mailto:ferminsorzzoni@gmail.com" className="text-sm text-gray-mid hover:text-primary transition-colors">
                    Contacto
                </a>
                <a
                    href="https://github.com/ferminsorzzoni/unitracker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-mid hover:text-primary transition-colors"
                >
                    GitHub
                </a>
            </div>

            </div>
        </footer>
    );
}