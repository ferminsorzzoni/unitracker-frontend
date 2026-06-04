import z from "zod";

const createPrerequisiteSchema = z.object({
    type: z.enum(["ATTEMPTED", "REGULARIZED", "PASSED"]),
    subjectId: z.uuid(),
    prerequisiteId: z.uuid(),
});

const createPrerequisiteFormSchema = z.object({
    prerequisiteId: z.string().min(1, "Seleccioná una materia"),
    type: z.enum(["ATTEMPTED", "REGULARIZED", "PASSED"]),
})

export { createPrerequisiteSchema, createPrerequisiteFormSchema };