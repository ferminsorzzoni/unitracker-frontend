import { useRemoveCategory, useUpdateCategory } from "../../hooks/academic/useCategories";
import { useCreateSubcategory, useRemoveSubcategory, useUpdateSubcategory } from "../../hooks/academic/useSubcategories";
import { useCreateSubject, useRemoveSubject, useUpdateSubject } from "../../hooks/academic/useSubjects";
import { useCreatePrerequisite, useRemovePrerequisite } from "../../hooks/academic/usePrerequisites";

export type CategoryActions = {
    update: ReturnType<typeof useUpdateCategory>["mutate"]
    delete: ReturnType<typeof useRemoveCategory>["mutate"]
};

export type SubcategoryActions = {
    create: ReturnType<typeof useCreateSubcategory>["mutate"]
    update: ReturnType<typeof useUpdateSubcategory>["mutate"]
    delete: ReturnType<typeof useRemoveSubcategory>["mutate"]
};

export type SubjectActions = {
    create: ReturnType<typeof useCreateSubject>["mutate"]
    update: ReturnType<typeof useUpdateSubject>["mutate"]
    delete: ReturnType<typeof useRemoveSubject>["mutate"]
};

export type PrerequisiteActions = {
    create: ReturnType<typeof useCreatePrerequisite>["mutate"]
    delete: ReturnType<typeof useRemovePrerequisite>["mutate"]
}