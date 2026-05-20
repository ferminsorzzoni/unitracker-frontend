import z from "zod";

const createSubcategorySchema = z.object({
    name: z.string().trim().min(1, "Mínimo 1 carácter"),
    categoryId: z.uuid(),
});

const updateSubcategorySchema = z.object({
    name: z.string().trim().min(1).optional(),
    order: z.int().positive().optional(),
});

export { createSubcategorySchema, updateSubcategorySchema };