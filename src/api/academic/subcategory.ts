import api from "../../lib/axios";
import type { CreateSubcategoryRequestDTO, CreateSubcategoryResponseDTO, UpdateSubcategoryRequestDTO, UpdateSubcategoryResponseDTO } from "../../types/academic/subcategory";

async function create(body: CreateSubcategoryRequestDTO): Promise<CreateSubcategoryResponseDTO> {
    const { data } = await api.post<CreateSubcategoryResponseDTO>("/academic/subcategories", body);
    return data;
}

async function update({ subcategoryId, body }: { subcategoryId: string, body: UpdateSubcategoryRequestDTO }): Promise<UpdateSubcategoryResponseDTO> {
    const { data } = await api.patch(`/academic/subcategories/${subcategoryId}`, body);
    return data;
}

function remove(subcategoryId: string) {
    return api.delete(`/academic/subcategories/${subcategoryId}`);
}

export { create, update, remove };