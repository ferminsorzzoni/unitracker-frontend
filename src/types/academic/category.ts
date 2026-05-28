import type z from "zod";
import type { Subcategory } from "./subcategory";
import type { createCategoryFormSchema, updateCategorySchema } from "../../schemas/academic/category";

interface Category {
    id: string,
    name: string,
    careerId: string,
    order: number,
    subcategories: Subcategory[],
}

type CreateCategoryRequestDTO = Pick<Category, "name" | "careerId">
type CreateCategoryFormSchema = z.infer<typeof createCategoryFormSchema>
type UpdateCategoryRequestDTO = z.infer<typeof updateCategorySchema>
type CreateCategoryResponseDTO = Omit<Category, "subcategories">
type UpdateCategoryResponseDTO = Omit<Category, "subcategories">

export type { Category, CreateCategoryRequestDTO, CreateCategoryFormSchema, UpdateCategoryRequestDTO, CreateCategoryResponseDTO, UpdateCategoryResponseDTO };