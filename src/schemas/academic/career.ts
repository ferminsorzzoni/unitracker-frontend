import z from "zod";
import { optionalString } from "../../utils/optionalString";

const createCareerSchema = z.object({
    name: z.string().trim().min(1, "Mínimo 1 carácter"),
    institution: optionalString,
    isOfficial: z.boolean().optional(),
});

const updateCareerSchema = createCareerSchema.partial();

export { createCareerSchema, updateCareerSchema };