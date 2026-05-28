import { useRef } from "react";
import { useLogout } from "../../hooks/useAuth";

export default function HeaderLogoutButton() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { mutate, isPending } = useLogout();

    return (
        <>
            <button onClick={() => dialogRef.current?.showModal()} title="Cerrar sesión" className="hover:bg-gray-light rounded-full p-2 transition-colors flex justify-center items-center">
                <img src="/logos/logout.svg" alt="Cerrar sesión" className="w-6 h-6" />
            </button>

            <dialog ref={dialogRef} className="m-auto rounded-lg p-6 shadow-xl backdrop:bg-black/50">
                <h2 className="text-xl font-medium text-gray-dark mb-4">¿Estas seguro de cerrar sesión?</h2>

                <div className="flex justify-end gap-3 mt-3">
                    <button 
                        onClick={() => dialogRef.current?.close()}
                        className="text-sm text-gray-mid hover:text-gray-dark transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => mutate()}
                        disabled={isPending}
                        className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                    >
                        {isPending ? "Cerrando sesión..." : "Cerrar sesión"}
                    </button>
                </div>
            </dialog>
        </>
    );
}