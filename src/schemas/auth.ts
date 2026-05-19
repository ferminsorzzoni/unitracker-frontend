import { z } from "zod";

const registerSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string(),
    name: z.string().min(2, "Mínimo 2 caracteres"),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

const loginSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string().min(1, "Mínimo 1 carácter"),
});

export { registerSchema, loginSchema };