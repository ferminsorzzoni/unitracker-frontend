import React, { createContext, useContext } from "react"
import type { CategoryActions, PrerequisiteActions, SubcategoryActions, SubjectActions } from "../types/academic/actions"
import type { ExtendedSubject } from "../types/academic/subject"

interface CareerContextType {
    isOwner: boolean
    subjectsMap: Record<string, ExtendedSubject>
    categoryActions: CategoryActions
    subcategoryActions: SubcategoryActions
    subjectActions: SubjectActions
    prerequisiteActions: PrerequisiteActions
}

const CareerContext = createContext<CareerContextType | null>(null);

export function useCareerContext() {
    const ctx = useContext(CareerContext);
    if(!ctx) throw new Error("useCareerContext debe usarse dentro de CareerProvider");
    return ctx;
}

export function CareerProvider({ children, value }: { children: React.ReactNode, value: CareerContextType }) {
    return <CareerContext.Provider value={value}>{children}</CareerContext.Provider>;
}