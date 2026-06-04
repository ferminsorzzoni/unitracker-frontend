import type z from "zod";
import type { ExtendedPrerequisite, Prerequisite } from "./prerequisite";
import type { createSubjectFormSchema, createSubjectSchema, updateSubjectFormSchema, updateSubjectSchema } from "../../schemas/academic/subject";

type SubjectState = "PENDING" | "IN_PROGRESS" | "REGULARIZED" | "FAILED" | "PASSED";

interface Subject {
    id: string,
    mark: number | null,
    name: string,
    state: SubjectState,
    order: number,
    weeklyMinutes: number | null,
    subcategoryId: string,
    prerequisites: Prerequisite[],
}

interface ExtendedSubject extends Omit<Subject, "prerequisites"> {
    prerequisites: ExtendedPrerequisite[],
    requiredBy: ExtendedPrerequisite[],
}

type CreateSubjectRequestDTO = z.infer<typeof createSubjectSchema>
type UpdateSubjectRequestDTO = z.infer<typeof updateSubjectSchema>
type CreateSubjectFormSchema = z.infer<typeof createSubjectFormSchema>
type CreateSubjectResponseDTO = Omit<Subject, "prerequisites">
type UpdateSubjectResponseDTO = Omit<Subject, "prerequisites">
type UpdateSubjectFormSchema = z.infer<typeof updateSubjectFormSchema>

export type { SubjectState, Subject, ExtendedSubject, CreateSubjectRequestDTO, UpdateSubjectRequestDTO, CreateSubjectFormSchema, CreateSubjectResponseDTO, UpdateSubjectResponseDTO, UpdateSubjectFormSchema };