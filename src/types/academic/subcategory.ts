import type z from "zod";
import type { Subject } from "./subject";
import type { createSubcategoryFormSchema, createSubcategorySchema, updateSubcategorySchema } from "../../schemas/academic/subcategory";

interface Subcategory {
    id: string,
    name: string,
    categoryId: string,
    order: number,
    subjects: Subject[],
}

type CreateSubcategoryRequestDTO = z.infer<typeof createSubcategorySchema>
type UpdateSubcategoryRequestDTO = z.infer<typeof updateSubcategorySchema>
type CreateSubcategoryResponseDTO = Omit<Subcategory, "subjects">
type CreateSubcategoryFormSchema = z.infer<typeof createSubcategoryFormSchema>
type UpdateSubcategoryResponseDTO = Omit<Subcategory, "subjects">

export type { Subcategory, CreateSubcategoryRequestDTO, UpdateSubcategoryRequestDTO, CreateSubcategoryResponseDTO, CreateSubcategoryFormSchema, UpdateSubcategoryResponseDTO };