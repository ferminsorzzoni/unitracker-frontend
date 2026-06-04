import { useRef } from "react";
import { useCareerContext } from "../../../contexts/CareerContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreatePrerequisiteFormSchema } from "../../../types/academic/prerequisite";
import { createPrerequisiteFormSchema } from "../../../schemas/academic/prerequisite";
import type { ExtendedSubject } from "../../../types/academic/subject";

export default function CreatePrerequisiteButton({ subject }: { subject: ExtendedSubject }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { prerequisiteActions, subjectsMap } = useCareerContext();
    const availableSubjects = Object.values(subjectsMap).filter(s => 
        s.id !== subject.id &&
        !subject.prerequisites.some(p => p.prerequisiteId === s.id)
    )

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreatePrerequisiteFormSchema>({
        resolver: zodResolver(createPrerequisiteFormSchema),
        mode: "onTouched",
        defaultValues: {
            prerequisiteId: "",
            type: "PASSED",
        }
    });

    const onCreate = (body: CreatePrerequisiteFormSchema) => {
        prerequisiteActions.create(
            {
                ...body,
                subjectId: subject.id,
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
                className="text-xs text-primary"
            >
                + Agregar correlativa
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
                <h2 className="text-xl font-medium text-gray-dark mb-4">Agregar correlativa</h2>

                <form onSubmit={handleSubmit(onCreate)} className="flex flex-col gap-4">
                     <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-dark">Materia</label>
                        <select {...register("prerequisiteId")} className="border rounded-lg px-3 py-2 text-sm">
                            <option value="">Seleccionar materia</option>
                            {availableSubjects.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                        {errors.prerequisiteId && <p className="text-xs text-danger">{errors.prerequisiteId.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-dark">Tipo</label>
                        <select {...register("type")} className="border rounded-lg px-3 py-2 text-sm">
                            <option value="PASSED">Aprobada</option>
                            <option value="REGULARIZED">Regular</option>
                            <option value="ATTEMPTED">Cursada</option>
                        </select>
                        {errors.type && <p className="text-xs text-danger">{errors.type.message}</p>}
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
                            disabled={prerequisiteActions.isCreating}
                            className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                        >
                            {prerequisiteActions.isCreating ? "Creando..." : "Crear"}
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
}