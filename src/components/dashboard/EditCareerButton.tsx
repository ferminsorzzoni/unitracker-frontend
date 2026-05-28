import { useRef } from "react";
import { useUpdateCareer } from "../../hooks/academic/useCareers";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCareerSchema } from "../../schemas/academic/career";
import { useForm } from "react-hook-form";
import type { CareerCardDTO, UpdateCareerRequestDTO } from "../../types/academic/career";
import editIcon from "../../assets/icons/edit.svg";

export default function EditCareerButton({ career }: { career: CareerCardDTO }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { mutate, isPending } = useUpdateCareer();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateCareerRequestDTO>({
        resolver: zodResolver(updateCareerSchema),
        mode: "onTouched",
        defaultValues: {
            name: career.name,
            institution: career.institution ?? "",
        }
    });
    const onUpdate = (body: UpdateCareerRequestDTO) => {
        const payload = { 
            careerId: career.id,
            body: {
                ...body,
                name: body.name === "" ? undefined : body.name,
                institution: body.institution === "" ? undefined: body.institution,
            },
        }

        mutate(payload, {
            onSuccess: () => {
                dialogRef.current?.close();
            }
        });
        };

    return (
        <>
            <button onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                dialogRef.current?.showModal();
            }} className="p-2 rounded-full border border-gray-light hover:border-gray-mid hover:shadow-lg transition-all">
                <img src={editIcon} alt="Editar carrera" className="w-4 h-4"/>
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
                <h2 className="text-xl font-medium text-gray-dark mb-4">Editar carrera</h2>

                <form onSubmit={handleSubmit(onUpdate)} className="flex flex-col gap-4">
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
                            {isPending ? "Editando..." : "Editar"}
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
}