import type { GetCareerResponseDTO } from "../types/academic/career";
import type { PrerequisiteType } from "../types/academic/prerequisite";
import type { ExtendedSubject, SubjectState, UpdateSubjectRequestDTO } from "../types/academic/subject";

export function updateSubjectInCareer(career: GetCareerResponseDTO, subjectId: string, body: UpdateSubjectRequestDTO): GetCareerResponseDTO {
    return {
        ...career,
        categories: career.categories.map((c) => ({
            ...c,
            subcategories: c.subcategories.map((sc) => ({
                ...sc,
                subjects: sc.subjects.map((s) =>
                    s.id === subjectId ? { ...s, ...body } : s
                ),
            })),
        })),
    };
}

export function isSubjectAvailable(subject: ExtendedSubject) {
    return subject.prerequisites.every(prerequisite => prerequisite.isMet);
}

export function isPrerequisiteMet(state: SubjectState | undefined, type: PrerequisiteType) {
    if(!state) return false;
    return state === type || (state === "FAILED" && type === "ATTEMPTED");
}