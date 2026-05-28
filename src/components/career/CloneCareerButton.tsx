import { useRef } from "react";
import { useCloneCareer } from "../../hooks/academic/useCareers";

export default function CloneCareerButton({ careerId }: { careerId: string }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { mutate, isPending } = useCloneCareer();

    const onClone = () => {
        mutate(careerId,
            {
                onSuccess: () => {
                    dialogRef.current?.close();
                }
            }
        )
    };

    return (
        <>
            <button onClick={() => dialogRef.current?.showModal()} className="p-2 px-6 rounded-full border hover:bg-primary-light border-gray-soft hover:border-gray-mid hover:shadow-lg transition-all">
                Clonar carrera
            </button>


            <dialog ref={dialogRef} className="m-auto rounded-lg p-6 shadow-xl backdrop:bg-black/50">
                <h2 className="text-xl font-medium text-gray-dark mb-4">Crear categoría</h2>

                <dialog 
                    ref={dialogRef} 
                    className="m-auto rounded-lg p-6 shadow-xl backdrop:bg-black/50"
                >
                    <h2>¿Estás seguro de clonar esta carrera?</h2>

                    <div className="flex justify-end gap-3 mt-3">
                        <button 
                            onClick={() => dialogRef.current?.close()}
                            className="text-sm text-gray-mid hover:text-gray-dark transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => onClone()}
                            disabled={isPending}
                            className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                        >
                            {isPending ? "Clonando..." : "Clonar"}
                        </button>
                    </div>
            </dialog>
            </dialog>
        </>
    );
}