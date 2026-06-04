import z from "zod";

const createSubcategorySchema = z.object({
    name: z.string().trim().min(1, "Mínimo 1 carácter"),
    categoryId: z.uuid(),
});

const createSubcategoryFormSchema = z.object({
    name: z.string().trim().min(1, "Mínimo 1 carácter"),
});

const updateSubcategorySchema = z.object({
    name: z.string().trim().min(1).optional(),
    order: z.int().positive().optional(),
});

export { createSubcategorySchema, createSubcategoryFormSchema, updateSubcategorySchema };