import { useRef } from "react";
import { useCareerContext } from "../../../contexts/CareerContext";
import thrashIcon from "../../../assets/icons/trash.svg";

export default function DeletePrerequisiteButton({ prerequisiteId }: { prerequisiteId: string }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { prerequisiteActions } = useCareerContext();

    const onDelete = () => {
        prerequisiteActions.delete(prerequisiteId, {
            onSuccess: () => {
                dialogRef.current?.close();
            }
        });
    };

    return (
        <>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    dialogRef.current?.showModal();
                }}
                title="Borrar correlativa"
                className="p-1 rounded-lg hover:shadow-lg transition-all"
            >
                <img src={thrashIcon} alt="Borrar correlativa" className="w-3 h-3"/>
            </button>

            <dialog 
                ref={dialogRef} 
                className="m-auto rounded-lg p-6 shadow-xl backdrop:bg-black/50"
            >
                <h2 className="text-lg">¿Estás seguro de borrar esta correlativa?</h2>

                <div className="flex justify-end gap-3 mt-3">
                        <button 
                            onClick={() => dialogRef.current?.close()}
                            className="text-sm text-gray-mid hover:text-gray-dark transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => onDelete()}
                            disabled={prerequisiteActions.isDeleting}
                            className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                        >
                            {prerequisiteActions.isDeleting ? "Borrando..." : "Borrar"}
                        </button>
                    </div>
            </dialog>
        </>
    );
}