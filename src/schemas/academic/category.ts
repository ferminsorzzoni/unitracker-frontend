import z from "zod";

const createCategoryFormSchema = z.object({
    name: z.string().trim().min(1, "Mínimo 1 carácter"),
})

const updateCategorySchema = z.object({
    name: z.string().trim().min(1, "Mínimo 1 carácter").optional(),
    order: z.int().positive().optional(),
});

export { createCategoryFormSchema, updateCategorySchema };