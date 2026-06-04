import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useAuth";
import { getAxiosError } from "../utils/error";
import type { LoginRequestDTO } from "../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { Link } from "react-router-dom";

export default function Login() {
    const { mutate, isPending, error } = useLogin();
    const axiosError = error ? getAxiosError(error) : null;

    const { register, handleSubmit, formState: { errors }} = useForm<LoginRequestDTO>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
    });

    const onLogin = (body: LoginRequestDTO) => mutate(body);

    /* <Link to="/recover" className="text-sm text-primary hover:text-primary-dark">Olvidé mi contraseña</Link> */

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-light">
            <div className="bg-white p-8 rounded-2xl">
                <div className="flex flex-col mb-8">
                    <h1 className="text-2xl text-gray-dark mb-1">Inciar sesión</h1>
                    <p className="text-gray-mid">Ingresá a tu cuenta de Unitracker</p>
                </div>
                <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-5">
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
                        <div className="flex justify-between">
                            <label className="text-sm font-medium text-gray-dark">Contraseña</label>
                        </div>
                        
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

                    {axiosError?.status === 401 && (
                        <p className="text-sm text-danger">Crendeciales inválidas</p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-2 rounded-lg text-sm text-white font-medium bg-primary hover:bg-primary-dark disabled:opacity-50 transition-colors"    
                    >
                        {isPending ? "Ingresando..." : "Ingresar"}
                    </button>

                    <GoogleAuthButton />

                    <p className="text-sm text-center text-gray-mid">
                        ¿No tenés cuenta?{" "}
                        <Link to="/register" className="text-primary hover:text-primary-dark">Registrate</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}