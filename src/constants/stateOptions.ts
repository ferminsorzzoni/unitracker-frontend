import type { PrerequisiteType } from "../types/academic/prerequisite";
import type { SubjectState } from "../types/academic/subject";

    export const STATE_OPTIONS: { value: SubjectState; label: string; border: string; background: string; }[] = [
        { value: "PENDING", label: "Pendiente", border: "border-gray-soft", background: "bg-gray-soft", },
        { value: "IN_PROGRESS", label: "En curso", border: "border-blue-400", background: "bg-blue-400", },
        { value: "REGULARIZED", label: "Regular", border: "border-amber-300", background: "bg-amber-300", }, 
        { value: "PASSED", label: "Aprobada", border: "border-green-500", background: "bg-green-500", },
    ];

    export const TYPE_OPTIONS: { value: PrerequisiteType; label: string; background: string }[] = [
        { value: "PASSED", label: "Aprobada", background: "bg-green-500" },
        { value: "REGULARIZED", label: "Regular", background: "bg-amber-300" },
        { value: "ATTEMPTED", label: "Cursada", background: "bg-orange-400" },
    ];