import api from "../../lib/axios";
import type { CreateSubjectRequestDTO, CreateSubjectResponseDTO, UpdateSubjectRequestDTO, UpdateSubjectResponseDTO } from "../../types/academic/subject";

async function create(body: CreateSubjectRequestDTO): Promise<CreateSubjectResponseDTO> {
    const payload = {
        ...body,
        weeklyMinutes: body.weeklyMinutes !== undefined ? body.weeklyMinutes * 60 : undefined,
    }
    const { data } = await api.post<CreateSubjectResponseDTO>("/academic/subjects", payload);
    return data;
}

async function update({ subjectId, body }: { subjectId: string, body: UpdateSubjectRequestDTO }): Promise<UpdateSubjectResponseDTO> {
    const payload = {
        ...body,
        weeklyMinutes: body.weeklyMinutes !== undefined ? body.weeklyMinutes * 60 : undefined,
    }
    const { data } = await api.patch<UpdateSubjectResponseDTO>(`/academic/subjects/${subjectId}`, payload);
    return data;
}

function remove(subjectId: string) {
    return api.delete(`/academic/subjects/${subjectId}`);
}

export { create, update, remove };