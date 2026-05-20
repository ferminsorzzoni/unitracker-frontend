import type z from "zod";
import type { createCareerSchema, updateCareerSchema } from "../../schemas/academic/career";
import type { Category } from "./category";

interface Career {
    id: string,
    name: string,
    institution: string | null,
    isOfficial: boolean,
    userId: string,
    categories: Category[],
}

type CreateCareerRequestDTO = z.infer<typeof createCareerSchema>
type UpdateCareerRequestDTO = z.infer<typeof updateCareerSchema>
type CreateCareerResponseDTO = Omit<Career, "categories">
type GetMyCareersResponseDTO = Omit<Career, "categories">[]
type GetCareerResponseDTO = Career
type UpdateCareerResponseDTO = Omit<Career, "categories">
type CloneCareerResponseDTO = Career
type CareerCardDTO = Omit<Career, "categories">

export type { CreateCareerRequestDTO, UpdateCareerRequestDTO, CreateCareerResponseDTO, GetMyCareersResponseDTO, GetCareerResponseDTO, UpdateCareerResponseDTO, CloneCareerResponseDTO, CareerCardDTO };