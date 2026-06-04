import type z from "zod";
import type { createPrerequisiteFormSchema, createPrerequisiteSchema } from "../../schemas/academic/prerequisite";

type PrerequisiteType = "ATTEMPTED" | "REGULARIZED" | "PASSED";

interface Prerequisite {
    id: string,
    type: PrerequisiteType,
    subjectId: string,
    prerequisiteId: string,
}

interface ExtendedPrerequisite extends Prerequisite {
    isMet: boolean,
}

type CreatePrerequisiteRequestDTO = z.infer<typeof createPrerequisiteSchema>
type CreatePrerequisiteResponseDTO = Prerequisite;
type CreatePrerequisiteFormSchema = z.infer<typeof createPrerequisiteFormSchema>

export type { PrerequisiteType, Prerequisite, ExtendedPrerequisite, CreatePrerequisiteRequestDTO, CreatePrerequisiteResponseDTO, CreatePrerequisiteFormSchema };