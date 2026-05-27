import { useLogout } from "../../hooks/useAuth";

export default function HeaderLogoutButton() {
    const { mutate, isPending } = useLogout();

    return (
        <button 
            onClick={() => mutate()}
            disabled={isPending}
            disabled:opacity-50
            title="Cerrar sesión"
        >
            <img src="/logos/logout.svg" alt="Cerrar sesión" className="w-6 h-6" />
        </button>
    );
}