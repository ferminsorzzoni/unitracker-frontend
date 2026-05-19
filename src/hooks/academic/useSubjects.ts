import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUnexpectedError } from "../../utils/error";
import { create, remove, update } from "../../api/academic/subject";

// 400, 403 y 404 no es posible en UI.
function useCreateSubject(careerId: string) {
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
function useUpdateSubject(careerId: string) {
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
function useRemoveSubject(careerId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["careers", careerId] });
        },
        onError: (error) => handleUnexpectedError(error)
    });
}

export { useCreateSubject, useUpdateSubject, useRemoveSubject };