import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUnexpectedError } from "../../utils/error";
import { create, remove } from "../../api/academic/prerequisite";

// 400, 403 y 404 no es posible en UI.
function useCreatePrerequisite(careerId: string) {
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
function useRemovePrerequisite(careerId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["careers", careerId] });
        },
        onError: (error) => handleUnexpectedError(error)
    });
}

export { useCreatePrerequisite, useRemovePrerequisite };