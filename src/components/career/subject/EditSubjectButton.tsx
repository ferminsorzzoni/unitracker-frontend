import type { Subject, UpdateSubjectFormSchema } from "../../../types/academic/subject";
import editIcon from "../../../assets/icons/edit.svg";
import { useRef } from "react";
import { useCareerContext } from "../../../contexts/CareerContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateSubjectFormSchema } from "../../../schemas/academic/subject";

export default function EditSubjectButton({ subject }: { subject: Subject }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { subjectActions } = useCareerContext();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateSubjectFormSchema>({
        resolver: zodResolver(updateSubjectFormSchema),
        mode: "onTouched",
        defaultValues: {
            name: subject.name,
            weeklyMinutes: subject.weeklyMinutes ? subject.weeklyMinutes / 60 : undefined,
            mark: subject.mark ?? undefined,
        }
    });

    const onUpdate = (body: UpdateSubjectFormSchema) => {
        subjectActions.update(
            {
                body,
                subjectId: subject.id,
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
                title="Editar materia"
                className="p-1 rounded-lg border border-gray-soft hover:border-gray-mid hover:shadow-lg transition-all"
            >
                <img src={editIcon} alt="Editar materia" className="w-4 h-4"/>
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
                <h2 className="text-xl font-medium text-gray-dark mb-4">Editar materia</h2>
                <p className="text-xs mb-4">Los campos con (*) son obligatorios</p>

                <form onSubmit={handleSubmit(onUpdate)} className="flex flex-col gap-4">
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

                    { subject.state === "PASSED" &&
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-dark">Nota</label>
                        <input 
                        type="number" 
                        min={0}
                        max={10} 
                        {...register("mark", { setValueAs: (value) => value === "" ? null : Number(value) })} 
                        className="border rounded-lg px-3 py-2 text-sm" />
                        {errors.mark && <p className="text-xs text-danger">{errors.mark.message}</p>}
                    </div>
                    }

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
                            disabled={subjectActions.isUpdating}
                            className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                        >
                            {subjectActions.isUpdating ? "Editando..." : "Editar"}
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
}