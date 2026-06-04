import { useRemoveCategory, useUpdateCategory } from "../../hooks/academic/useCategories";
import { useCreateSubcategory, useRemoveSubcategory, useUpdateSubcategory } from "../../hooks/academic/useSubcategories";
import { useCreateSubject, useRemoveSubject, useUpdateSubject } from "../../hooks/academic/useSubjects";
import { useCreatePrerequisite, useRemovePrerequisite } from "../../hooks/academic/usePrerequisites";

export type CategoryActions = {
    update: ReturnType<typeof useUpdateCategory>["mutate"]
    isUpdating: boolean
    delete: ReturnType<typeof useRemoveCategory>["mutate"]
    isDeleting: boolean
};

export type SubcategoryActions = {
    create: ReturnType<typeof useCreateSubcategory>["mutate"]
    isCreating: boolean
    update: ReturnType<typeof useUpdateSubcategory>["mutate"]
    isUpdating: boolean
    delete: ReturnType<typeof useRemoveSubcategory>["mutate"]
    isDeleting: boolean
};

export type SubjectActions = {
    create: ReturnType<typeof useCreateSubject>["mutate"]
    isCreating: boolean
    update: ReturnType<typeof useUpdateSubject>["mutate"]
    isUpdating: boolean
    delete: ReturnType<typeof useRemoveSubject>["mutate"]
    isDeleting: boolean
};

export type PrerequisiteActions = {
    create: ReturnType<typeof useCreatePrerequisite>["mutate"]
    isCreating: boolean
    delete: ReturnType<typeof useRemovePrerequisite>["mutate"]
    isDeleting: boolean
}