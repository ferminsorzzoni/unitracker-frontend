import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useAuth";
import { getAxiosError } from "../utils/error";
import type { RegisterRequestDTO } from "../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/auth";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { Link } from "react-router-dom";

export default function Register() {
    const { mutate, isPending, error } = useRegister();
    const axiosError = error ? getAxiosError(error) : null;

    const { register, handleSubmit, formState: { errors }} = useForm<RegisterRequestDTO>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched",
    });

    const onSubmit = (body: RegisterRequestDTO) => mutate(body);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-light">
            <div className="bg-white p-8 rounded-2xl">
                <div className="flex flex-col mb-8">
                    <h1 className="text-2xl text-gray-dark mb-1">Registrate</h1>
                    <p className="text-gray-mid">Creá tu cuenta de Unitracker</p>
                </div>

                <GoogleAuthButton />

                <div className="grid grid-cols-2 gap-5 mt-4 border-t border-gray-mid pt-4">

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-dark">Email</label>
                        <input 
                            {...register("email")}
                            type="email"
                            placeholder="example@email.com"
                            className="text-sm w-full px-3 py-2 border border-gray-mid rounded-lg focus:outline-none focus:border-primary"
                        />

                        {errors.email && (
                            <p className="text-xs text-danger">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-dark">Contraseña</label>
                        <input 
                            {...register("password")}
                            type="password"
                            placeholder="••••••••"
                            className="text-sm w-full px-3 py-2 border border-gray-mid rounded-lg focus:outline-none focus:border-primary"
                        />

                        {errors.password && (
                            <p className="text-xs text-danger">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-dark">Nombre</label>
                        <input 
                            {...register("name")}
                            type="text"
                            placeholder="Juan Doe"
                            className="text-sm w-full px-3 py-2 border border-gray-mid rounded-lg focus:outline-none focus:border-primary"
                        />

                        {errors.name && (
                            <p className="text-xs text-danger">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-dark">Confirmar contraseña</label>
                        <input 
                            {...register("confirmPassword")}
                            type="password"
                            placeholder="••••••••"
                            className="text-sm w-full px-3 py-2 border border-gray-mid rounded-lg focus:outline-none focus:border-primary"
                        />

                        {errors.confirmPassword && (
                            <p className="text-xs text-danger">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {axiosError?.status === 409 && (
                        <p className="text-sm text-danger">Email ya registrado</p>
                    )}

                    <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isPending}
                        className="w-full py-2 rounded-lg text-sm text-white font-medium bg-primary hover:bg-primary-dark disabled:opacity-50 transition-colors"    
                    >
                        {isPending ? "Ingresando..." : "Ingresar"}
                    </button>

                    <div className="flex items-center">
                        <p className="text-sm text-gray-mid">
                            ¿Ya tenés cuenta?{" "}
                            <Link to="/login" className="text-primary hover:text-primary-dark">Inicia sesión</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}