import api from "../../lib/axios";
import type { CloneCareerResponseDTO, CreateCareerRequestDTO, CreateCareerResponseDTO, GetCareerResponseDTO, GetMyCareersResponseDTO, UpdateCareerRequestDTO, UpdateCareerResponseDTO } from "../../types/academic/career";

async function create(body: CreateCareerRequestDTO): Promise<CreateCareerResponseDTO> {
    const { data } = await api.post<CreateCareerResponseDTO>("/academic/careers", body);
    return data;
}

async function getMy(): Promise<GetMyCareersResponseDTO> {
    const { data } = await api.get<GetMyCareersResponseDTO>("/academic/careers/my");
    return data;
}

async function get(careerId: string): Promise<GetCareerResponseDTO> {
    const { data } = await api.get<GetCareerResponseDTO>(`/academic/careers/${careerId}`);
    return data;
}

async function update({ careerId, body }: { careerId: string, body: UpdateCareerRequestDTO }): Promise<UpdateCareerResponseDTO> {
    const { data } = await api.patch<UpdateCareerResponseDTO>(`/academic/careers/${careerId}`, body);
    return data;
}

function remove(careerId: string) {
    return api.delete(`/academic/careers/${careerId}`);
}

async function clone(careerId: string): Promise<CloneCareerResponseDTO> {
    const { data } = await api.post<CloneCareerResponseDTO>(`/academic/careers/${careerId}/clone`);
    return data;
}

export { create, getMy, get, update, remove, clone };