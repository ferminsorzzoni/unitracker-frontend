import { useRef } from "react";
import thrashIcon from "../../../assets/icons/trash.svg";
import { useCareerContext } from "../../../contexts/CareerContext";

export default function DeleteSubjectButton({ subjectId }: { subjectId: string }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { subjectActions } = useCareerContext();

    const onDelete = () => {
        subjectActions.delete(subjectId, {
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
                title="Borrar materia"
                className="p-1 rounded-lg border border-gray-soft hover:border-gray-mid hover:shadow-lg transition-all"
            >
                <img src={thrashIcon} alt="Borrar materia" className="w-4 h-4"/>
            </button>

            <dialog 
                ref={dialogRef} 
                className="m-auto rounded-lg p-6 shadow-xl backdrop:bg-black/50"
            >
                <h2>¿Estás seguro de borrar esta materia?</h2>

                <div className="flex justify-end gap-3 mt-3">
                        <button 
                            onClick={() => dialogRef.current?.close()}
                            className="text-sm text-gray-mid hover:text-gray-dark transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => onDelete()}
                            disabled={subjectActions.isDeleting}
                            className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                        >
                            {subjectActions.isDeleting ? "Borrando..." : "Borrar"}
                        </button>
                    </div>
            </dialog>
        </>
    );
}