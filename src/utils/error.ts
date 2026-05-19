import { AxiosError } from "axios"
import { toast } from "sonner";

export function getAxiosError(error: unknown) {
    if(error instanceof AxiosError) {
        return {
            status: error.response?.status,
            message: error.response?.data?.message ?? "Algo salió mal",
        }
    }
    return { status: undefined, message: "Algo salió mal" };
}

export function handleUnexpectedError(error: unknown, expectedStatuses: number[] = []) {
    const { status, message } = getAxiosError(error);
    if(!expectedStatuses.includes(status!)) toast.error("Algo salió mal");
    console.error(status, message)
}