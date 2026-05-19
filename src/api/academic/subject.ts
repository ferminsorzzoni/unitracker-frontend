import api from "../../lib/axios";
import type { CreateSubjectRequestDTO, CreateSubjectResponseDTO, UpdateSubjectRequestDTO, UpdateSubjectResponseDTO } from "../../types/academic/subject";

async function create(body: CreateSubjectRequestDTO): Promise<CreateSubjectResponseDTO> {
    const { data } = await api.post<CreateSubjectResponseDTO>("/academic/subjects", body);
    return data;
}

async function update({ subjectId, body }: { subjectId: string, body: UpdateSubjectRequestDTO }): Promise<UpdateSubjectResponseDTO> {
    const { data } = await api.patch<UpdateSubjectResponseDTO>(`/academic/subjects/${subjectId}`, body);
    return data;
}

function remove(subjectId: string) {
    return api.delete(`/academic/subjects/${subjectId}`);
}

export { create, update, remove };