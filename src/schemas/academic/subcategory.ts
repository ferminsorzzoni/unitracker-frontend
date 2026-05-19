import z from "zod";
import { optionalString } from "../../utils/optionalString";

const createSubcategorySchema = z.object({
    name: z.string().trim().min(1, "Mínimo 1 carácter"),
    categoryId: z.uuid(),
});

const updateSubcategorySchema = z.object({
    name: optionalString,
    order: z.int().positive().optional(),
});

export { createSubcategorySchema, updateSubcategorySchema };