import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create, remove, update } from "../../api/academic/subcategory";
import { handleUnexpectedError } from "../../utils/error";

// 400, 403 y 404 no es posible en UI.
function useCreateSubcategories(careerId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["careers", careerId] });
        },
        onError: (error) => handleUnexpectedError(error)
    });
}

// 400, 403 y 404 no es posible en UI.
function useUpdateSubcategories(careerId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["careers", careerId] });
        },
        onError: (error) => handleUnexpectedError(error)
    });
}

// 400, 403 y 404 no es posible en UI.
function useRemoveSubcategories(careerId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["careers", careerId] });
        },
        onError: (error) => handleUnexpectedError(error)
    });
}

export { useCreateSubcategories, useUpdateSubcategories, useRemoveSubcategories };