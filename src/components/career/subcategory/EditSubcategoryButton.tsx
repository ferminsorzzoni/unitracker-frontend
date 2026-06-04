import type { Subcategory, UpdateSubcategoryRequestDTO } from "../../../types/academic/subcategory";
import editIcon from "../../../assets/icons/edit.svg";
import { useRef } from "react";
import { useCareerContext } from "../../../contexts/CareerContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateSubcategorySchema } from "../../../schemas/academic/subcategory";

export default function EditSubcategoryButton({ subcategory }: { subcategory: Subcategory }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { subcategoryActions } = useCareerContext();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateSubcategoryRequestDTO>({
        resolver: zodResolver(updateSubcategorySchema),
        mode: "onTouched",
        defaultValues: {
            name: subcategory.name,
        }
    });

    const onUpdate = (body: UpdateSubcategoryRequestDTO) => {
        subcategoryActions.update(
            {
                body,
                subcategoryId: subcategory.id,
            },
            {
                onSuccess: () => {
                    dialogRef.current?.close();
                }
            }
        );
    };

    return (
        <>
            <button 
                onClick={() => dialogRef.current?.showModal()}
                title="Editar subcategoría"
                className="p-1 rounded-lg border border-gray-soft hover:border-gray-mid hover:shadow-lg transition-all"
            >
                <img src={editIcon} alt="Editar subcategoría" className="w-4 h-4"/>
            </button>


            <dialog 
                ref={dialogRef}
                onCancel={(e) => {
                    e.preventDefault();
                    reset();
                    dialogRef.current?.close();
                }}
                className="m-auto rounded-lg p-6 shadow-xl backdrop:bg-black/50"
            >
                <h2 className="text-xl font-medium text-gray-dark mb-4">Editar subcategoría</h2>

                <form onSubmit={handleSubmit(onUpdate)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-dark">Nombre</label>
                        <input {...register("name")} className="border rounded-lg px-3 py-2 text-sm" />
                        {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
                    </div>

                    <div className="flex justify-end gap-3 mt-3">
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                dialogRef.current?.close();
                            }}
                            className="text-sm text-gray-mid hover:text-gray-dark transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={subcategoryActions.isUpdating}
                            className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                        >
                            {subcategoryActions.isUpdating ? "Editando..." : "Editar"}
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
}