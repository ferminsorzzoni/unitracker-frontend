import { useRef } from "react";
import { useCareerContext } from "../../../contexts/CareerContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateSubcategoryFormSchema } from "../../../types/academic/subcategory";
import { createSubcategoryFormSchema } from "../../../schemas/academic/subcategory";
import addIcon from "../../../assets/icons/add.svg"

export default function CreateSubcategoryButton({ categoryId }: { categoryId: string }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { subcategoryActions } = useCareerContext();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateSubcategoryFormSchema>({
        resolver: zodResolver(createSubcategoryFormSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
        }
    });

    const onCreate = (body: CreateSubcategoryFormSchema) => {
        subcategoryActions.create(
            {
                ...body,
                categoryId,
            },
            {
                onSuccess: () => {
                    dialogRef.current?.close();
                    reset();
                }
            }
        );
    };

    return (
        <>
            <button 
                onClick={() => dialogRef.current?.showModal()}
                title="Nueva subcategoría"
                className="p-1 rounded-lg border border-gray-soft hover:border-gray-mid hover:shadow-lg transition-all"
            >
                <img src={addIcon} alt="Crear subcategoría" className="w-4 h-4"/>
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
                <h2 className="text-xl font-medium text-gray-dark mb-4">Crear subcategoría</h2>

                <form onSubmit={handleSubmit(onCreate)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-dark">Nombre</label>
                        <input {...register("name")} className="border rounded-lg px-3 py-2 text-sm" placeholder="Primer Cuatrimestre"/>
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
                            disabled={subcategoryActions.isCreating}
                            className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                        >
                            {subcategoryActions.isCreating ? "Creando..." : "Crear"}
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
}