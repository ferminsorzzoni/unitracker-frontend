export default function FooterUnitrackerLogo() {
    return (
        <div className="flex items-center gap-2">
            <img src="/logos/unitracker.svg" alt="" className="w-6 h-6" />
            <span className="text-sm text-gray-mid">Unitracker © {new Date().getFullYear()}</span>
        </div>
    );
}