import type z from "zod";
import type { createPrerequisiteSchema } from "../../schemas/academic/prerequisite";

type PrerequisiteType = "ATTEMPTED" | "REGULARIZED" | "PASSED";

interface Prerequisite {
    id: string,
    type: PrerequisiteType,
    subjectId: string,
    prerequisiteId: string,
}

type CreatePrerequisiteRequestDTO = z.infer<typeof createPrerequisiteSchema>
type CreatePrerequisiteResponseDTO = Prerequisite;

export type { Prerequisite, CreatePrerequisiteRequestDTO, CreatePrerequisiteResponseDTO };