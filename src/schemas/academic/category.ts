import z from "zod";
import { optionalString } from "../../utils/optionalString";

const createCategorySchema = z.object({
    name: z.string().trim().min(1, "Mínimo 1 carácter"),
    careerId: z.uuid(),
});

const updateCategorySchema = z.object({
    name: optionalString,
    order: z.int().positive().optional(),
});

export { createCategorySchema, updateCategorySchema };