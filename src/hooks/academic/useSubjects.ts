import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUnexpectedError } from "../../utils/error";
import { create, remove, update } from "../../api/academic/subject";
import type { GetCareerResponseDTO } from "../../types/academic/career";
import { updateSubjectInCareer } from "../../utils/career";

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
        onMutate: async ({ subjectId, body }) => {
            await queryClient.cancelQueries({ queryKey: ["careers", careerId] });

            const previous = queryClient.getQueryData<GetCareerResponseDTO>(["careers", careerId]);

            queryClient.setQueryData(["careers", careerId], (old: GetCareerResponseDTO) => updateSubjectInCareer(old, subjectId, body));

            return { previous };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(["careers", careerId], context?.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["careers", careerId] });
        },
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