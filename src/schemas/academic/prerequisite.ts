import z from "zod";

const createPrerequisiteSchema = z.object({
    type: z.enum(["ATTEMPTED", "REGULARIZED", "PASSED"]),
    subjectId: z.uuid(),
    prerequisiteId: z.uuid(),
});

export { createPrerequisiteSchema };