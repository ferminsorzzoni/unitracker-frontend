import api from "../../lib/axios";
import type { CreateCategoryRequestDTO, CreateCategoryResponseDTO, UpdateCategoryRequestDTO, UpdateCategoryResponseDTO } from "../../types/academic/category";

async function create(body: CreateCategoryRequestDTO): Promise<CreateCategoryResponseDTO> {
    const { data } = await api.post<CreateCategoryResponseDTO>("/academic/categories", body);
    return data;
}

async function update({ categoryId, body }: { categoryId: string, body: UpdateCategoryRequestDTO }): Promise<UpdateCategoryResponseDTO> {
    const { data } = await api.patch<UpdateCategoryResponseDTO>(`/academic/categories/${categoryId}`, body);
    return data;
}

function remove(categoryId: string) {
    return api.delete(`/academic/categories/${categoryId}`);
}

export { create, update, remove };