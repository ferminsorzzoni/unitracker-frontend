import z from "zod";

const createCareerSchema = z.object({
    name: z.string().trim().min(1, "Mínimo 1 carácter"),
    institution: z.string().trim().min(1, "Mínimo 1 carácter").optional(),
    isOfficial: z.boolean().optional(),
});

const updateCareerSchema = createCareerSchema.partial();

export { createCareerSchema, updateCareerSchema };