import { useRef } from "react";
import { useCreateCategory } from "../../hooks/academic/useCategories";
import { useForm } from "react-hook-form";
import type { CreateCategoryFormSchema } from "../../types/academic/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategoryFormSchema } from "../../schemas/academic/category";

export default function CreateCategoryButton({ careerId }: { careerId: string }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { mutate, isPending } = useCreateCategory(careerId);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateCategoryFormSchema>({
        resolver: zodResolver(createCategoryFormSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
        }
    });

    const onCreate = (body: CreateCategoryFormSchema) => {
        mutate(
            {
                ...body,
                careerId,
            },
            {
                onSuccess: () => {
                    dialogRef.current?.close();
                    reset();
                }
            }
        );
    }

    return (
        <>
            <button onClick={() => dialogRef.current?.showModal()} className="px-4 rounded-lg border hover:bg-primary-light border-gray-soft hover:border-gray-mid hover:shadow-lg transition-all">
                + Categoría
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
                <h2 className="text-xl font-medium text-gray-dark mb-4">Crear categoría</h2>

                <form onSubmit={handleSubmit(onCreate)} className="flex flex-col gap-4">
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
                            disabled={isPending}
                            className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                        >
                            {isPending ? "Creando..." : "Crear"}
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
}