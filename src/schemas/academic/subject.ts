import z from "zod";

const createSubjectSchema = z.object({
    name: z.string().trim().min(1, "Mínimo 1 carácter"),
    weeklyMinutes: z.int().positive("El número debe ser positivo").optional(),
    subcategoryId: z.uuid(),
});

const createSubjectFormSchema = z.object({
    name: z.string().trim().min(1, "Mínimo 1 carácter"),
    weeklyMinutes: z.int().positive("El número debe ser positivo").optional(),
});

const updateSubjectSchema = z.object({
    name: z.string().trim().min(1).optional(),
    mark: z.int().min(0).max(10).nullable().optional(),
    state: z
        .enum(["PENDING", "IN_PROGRESS", "REGULARIZED", "FAILED", "PASSED"])
        .optional(),
    weeklyMinutes: z.int().positive().optional(),
    order: z.int().positive().optional(),
});

const updateSubjectFormSchema = z.object({
    name: z.string().trim().min(1, "Mínimo 1 carácter").optional(),
    weeklyMinutes: z.int().positive("El número debe ser positivo").optional(),
    mark: z.int().min(0, "El número debe estar entre 0 y 10").max(10, "El número debe estar entre 0 y 10").nullable().optional(),
});

export { createSubjectSchema, createSubjectFormSchema, updateSubjectSchema, updateSubjectFormSchema };