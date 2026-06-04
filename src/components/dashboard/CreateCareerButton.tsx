import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCareer } from "../../hooks/academic/useCareers";
import { createCareerSchema } from "../../schemas/academic/career";
import type { CreateCareerRequestDTO } from "../../types/academic/career";

export default function CreateCareerButton() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { mutate, isPending } = useCreateCareer();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateCareerRequestDTO>({
        resolver: zodResolver(createCareerSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            institution: "",
        },
    });

    const onCreate = (body: CreateCareerRequestDTO) => {
        const payload = {
            ...body,
            institution: body.institution === "" ? undefined : body.institution
        }

        mutate(payload);
    }

    return (
        <>
            <button 
                onClick={() => dialogRef.current?.showModal()} 
                title="Nueva carrera"
                className="w-8 h-8 border bg-gray-light border-gray-mid rounded-full px-4 hover:bg-primary-light hover:shadow-md font-medium text-xl transition-all flex items-center justify-center"
            >
                +
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
                <h2 className="text-xl font-medium text-gray-dark mb-4">Crear carrera</h2>

                <form onSubmit={handleSubmit(onCreate)} className="flex flex-col gap-4">
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