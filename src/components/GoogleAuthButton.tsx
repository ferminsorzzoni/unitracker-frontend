import { useGoogleLogin } from "../hooks/useAuth";

export default function GoogleAuthButton() {
    const { mutate, isPending } = useGoogleLogin();

    return (
        <button
            onClick={() => mutate()}
            disabled={isPending}
            className="w-full py-2 border border-gray-mid rounded-lg text-sm font-medium text-gray-dark hover:bg-gray-light transition-colors flex items-center justify-center gap-2"
        >
            <img src="/logos/google.svg" alt="" className="w-4 h-4" />
            {isPending ? "Autenticando..." : "Continuar con Google"}
        </button>
    );
}