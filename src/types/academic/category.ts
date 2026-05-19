import type z from "zod";
import type { Subcategory } from "./subcategory";
import type { createCategorySchema, updateCategorySchema } from "../../schemas/academic/category";

interface Category {
    id: string,
    name: string,
    careerId: string,
    order: number,
    subcategories: Subcategory[],
}

type CreateCategoryRequestDTO = z.infer<typeof createCategorySchema>
type UpdateCategoryRequestDTO = z.infer<typeof updateCategorySchema>
type CreateCategoryResponseDTO = Omit<Category, "subcategories">
type UpdateCategoryResponseDTO = Omit<Category, "subcategories">

export type { Category, CreateCategoryRequestDTO, UpdateCategoryRequestDTO, CreateCategoryResponseDTO, UpdateCategoryResponseDTO };