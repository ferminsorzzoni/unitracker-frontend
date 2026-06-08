import { Link } from "react-router-dom";

export default function FooterLinks() {
    return (
        <div className="flex items-center gap-6 sm:gap-3">
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
    );
}