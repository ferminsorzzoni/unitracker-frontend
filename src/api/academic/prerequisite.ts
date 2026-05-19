import api from "../../lib/axios";
import type { CreatePrerequisiteRequestDTO, CreatePrerequisiteResponseDTO } from "../../types/academic/prerequisite";

async function create(body: CreatePrerequisiteRequestDTO): Promise<CreatePrerequisiteResponseDTO> {
    const { data } = await api.post<CreatePrerequisiteResponseDTO>("/academic/prerequisites", body);
    return data;
}

function remove(prerequisiteId: string) {
    return api.delete(`/academic/prerequisites/${prerequisiteId}`);
}

export { create, remove };