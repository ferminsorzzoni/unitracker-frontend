import type z from "zod";
import type { loginSchema, registerSchema } from "../schemas/auth";
import type { User } from "./user";

interface Auth {
    accessToken: string,
    user: User,
}

type RegisterRequestDTO = z.infer<typeof registerSchema>
type LoginRequestDTO = z.infer<typeof loginSchema>
type LoginResponseDTO = Auth
type RegisterResponseDTO = Auth
type RefreshAccessResponseDTO = Pick<Auth, "accessToken">


export type { RegisterRequestDTO, LoginRequestDTO, LoginResponseDTO, RegisterResponseDTO, RefreshAccessResponseDTO };