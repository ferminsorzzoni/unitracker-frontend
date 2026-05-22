import { useRef } from "react";
import { useRemoveCareer } from "../hooks/academic/useCareers";
import thrashIcon from "../assets/icons/trash.svg";

export default function DeleteCareerModal({ careerId }: { careerId: string}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { mutate, isPending } = useRemoveCareer();

    const onDelete = () => {
        mutate(careerId, {
            onSuccess: () => {
                dialogRef.current?.close();
            }
        });
    };

    return (
        <>
            <button onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                dialogRef.current?.showModal();
            }} className="p-2 rounded-full border border-gray-light hover:border-gray-mid hover:shadow-lg transition-all">
                <img src={thrashIcon} alt="Borrar carrera" className="w-4 h-4"/>
            </button>

            <dialog ref={dialogRef} className="m-auto rounded-lg p-6 shadow-xl backdrop:bg-black/50">
                <h2>¿Estás seguro de borrar esta carrera?</h2>

                <div className="flex justify-end gap-3 mt-3">
                        <button 
                            onClick={() => dialogRef.current?.close()}
                            className="text-sm text-gray-mid hover:text-gray-dark transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => onDelete()}
                            disabled={isPending}
                            className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                        >
                            {isPending ? "Borrando..." : "Aceptar"}
                        </button>
                    </div>
            </dialog>
        </>
    );
}