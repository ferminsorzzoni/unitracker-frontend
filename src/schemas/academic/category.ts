import z from "zod";

const createCategorySchema = z.object({
    name: z.string().trim().min(1, "Mínimo 1 carácter"),
    careerId: z.uuid(),
});

const updateCategorySchema = z.object({
    name: z.string().trim().min(1).optional(),
    order: z.int().positive().optional(),
});

export { createCategorySchema, updateCategorySchema };