import type z from "zod";
import type { Prerequisite } from "./prerequisite";
import type { createSubjectSchema, updateSubjectSchema } from "../../schemas/academic/subject";

type SubjectState = "PENDING" | "IN_PROGRESS" | "REGULARIZED" | "FAILED" | "PASSED";

interface Subject {
    id: string,
    mark: number | null,
    name: string,
    state: SubjectState,
    weeklyMinutes: number | null,
    subcategoryId: string,
    prerequisites: Prerequisite[],
}

interface ExtendedSubject extends Subject {
    requiredBy: Prerequisite[],
}

type CreateSubjectRequestDTO = z.infer<typeof createSubjectSchema>
type UpdateSubjectRequestDTO = z.infer<typeof updateSubjectSchema>
type CreateSubjectResponseDTO = Omit<Subject, "prerequisites">
type UpdateSubjectResponseDTO = Omit<Subject, "prerequisites">

export type { Subject, ExtendedSubject, CreateSubjectRequestDTO, UpdateSubjectRequestDTO, CreateSubjectResponseDTO, UpdateSubjectResponseDTO };