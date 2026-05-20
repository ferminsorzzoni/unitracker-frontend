import { useRef } from "react";
import { useCreateCareer } from "../hooks/academic/useCareers";
import { useForm } from "react-hook-form";
import type { CreateCareerRequestDTO } from "../types/academic/career";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCareerSchema } from "../schemas/academic/career";

export default function CreateCareerModal() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { mutate, isPending } = useCreateCareer();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateCareerRequestDTO>({
        resolver: zodResolver(createCareerSchema),
        mode: "onTouched",
    });

    const onSubmit = (body: CreateCareerRequestDTO) => {
        const payload = {
            ...body,
            institution: body.institution === "" ? undefined : body.institution
        }

        mutate(payload);
    }

    return (
        <>
            <button onClick={() => dialogRef.current?.showModal()}>
                Crear carrera
            </button>

            <dialog ref={dialogRef} className="rounded-lg p-6 shadow-xl backdrop:bg-black/50">
                <h2 className="text-xl font-medium text-gray-dark mb-4">Crear carrera</h2>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-dark">Nombre</label>
                        <input {...register("name")} className="border rounded-lg px-3 py-2 text-sm" />
                        {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-dark">Institución</label>
                        <input {...register("institution")} className="border rounded-lg px-3 py-2 text-sm" />
                        {errors.institution && <p className="text-xs text-danger">{errors.institution.message}</p>}
                    </div>

                    <div className="flex justify-end gap-3 mt-3">
                        <button 
                            onClick={() => dialogRef.current?.close()}
                            className="text-sm text-gray-mid hover:text-gray-dark transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isPending}
                            className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                        >
                            {isPending ? "Creando..." : "Crear"}
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}