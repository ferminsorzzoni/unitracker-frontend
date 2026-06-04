import { useRef } from "react";
import addIcon from "../../../assets/icons/add.svg"
import { useCareerContext } from "../../../contexts/CareerContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateSubjectFormSchema } from "../../../types/academic/subject";
import { createSubjectFormSchema } from "../../../schemas/academic/subject";

export default function CreateSubjectButton({ subcategoryId }: { subcategoryId: string }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { subjectActions } = useCareerContext();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateSubjectFormSchema>({
        resolver: zodResolver(createSubjectFormSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            weeklyMinutes: undefined,
        }
    });

    const onCreate = (body: CreateSubjectFormSchema) => {
        subjectActions.create(
            {
                ...body,
                weeklyMinutes: body.weeklyMinutes ?? undefined,
                subcategoryId,
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
                title="Nueva materia"
                className="p-1 rounded-lg border border-gray-soft hover:border-gray-mid hover:shadow-lg transition-all"
            >
                <img src={addIcon} alt="Crear materia" className="w-4 h-4"/>
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
                <h2 className="text-xl font-medium text-gray-dark">Crear materia</h2>
                <p className="text-xs mb-4">Los campos con (*) son obligatorios</p>

                <form onSubmit={handleSubmit(onCreate)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-dark">Nombre (*)</label>
                        <input {...register("name")} className="border rounded-lg px-3 py-2 text-sm" />
                        {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-dark">Horas semanales</label>
                        <input 
                        type="number" 
                        min={1} 
                        {...register("weeklyMinutes", { setValueAs: (value) => value === "" ? undefined : Number(value) })} 
                        className="border rounded-lg px-3 py-2 text-sm" />
                        {errors.weeklyMinutes && <p className="text-xs text-danger">{errors.weeklyMinutes.message}</p>}
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
                            disabled={subjectActions.isCreating}
                            className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                        >
                            {subjectActions.isCreating ? "Creando..." : "Crear"}
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
}