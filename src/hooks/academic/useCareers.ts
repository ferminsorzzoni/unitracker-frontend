import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clone, create, get, getMy, remove, update } from "../../api/academic/career";
import { handleUnexpectedError } from "../../utils/error";
import { useNavigate } from "react-router-dom";

// 400 y 403 no es posible en la UI.
function useCreateCareer() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: create,
        onSuccess: (career) => {
            queryClient.invalidateQueries({ queryKey: ["careers"]});
            navigate(`/careers/${career.id}`);
        },
        onError: (error) => handleUnexpectedError(error)
    });
}

function useGetMyCareers() {
    return useQuery({
        queryKey: ["careers"],
        queryFn: getMy
    });
}

// 400 y 404 no es posible en la UI.
function useGetCareer(id: string) {
    return useQuery({
        queryKey: ["careers", id],
        queryFn: () => get(id)
    });
}

// 400, 403 y 404 no es posible en la UI.
function useUpdateCareer() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: update,
        onSuccess: (_, { careerId }) => {
            queryClient.invalidateQueries({ queryKey: ["careers", careerId] });
            queryClient.invalidateQueries({ queryKey: ["careers"] });
        },
        onError: (error) => handleUnexpectedError(error)
    });
}

// 400, 403 y 404 no es posible en la UI.
function useRemoveCareer() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["careers"] });
            navigate("/dashboard");
        },
        onError: (error) => handleUnexpectedError(error)
    });
}

// 400 y 404 no es posible en la UI.
function useCloneCareer() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: clone,
        onSuccess: (newCareer, careerId) => {
            queryClient.invalidateQueries({ queryKey: ["careers", careerId] });
            queryClient.invalidateQueries({ queryKey: ["careers"] });
            navigate(`/careers/${newCareer.id}`);
        },
        onError: (error) => handleUnexpectedError(error)
    });
}

export { useCreateCareer, useGetMyCareers, useGetCareer, useUpdateCareer, useRemoveCareer, useCloneCareer };