import CareerCard from "../components/CareerCard";
import CreateCareerModal from "../components/CreateCareerModal";
import { useGetMyCareers } from "../hooks/academic/useCareers"
import { getAxiosError } from "../utils/error";

export default function Dashboard() {
    const { data, isLoading, error } = useGetMyCareers();

    if(isLoading) return <p>Cargando...</p>
    if(error) {
        const { message } = getAxiosError(error);
        return <p>{message}</p>
    }
    if(!data) return null;

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto w-full py-2">
            <div className="flex items-center justify-between border-b border-b-gray-mid w-full px-6 py-2">
                <h2 className="font-medium text-gray-dark text-xl">Tus carreras</h2>

                <div>
                    <CreateCareerModal />
                </div>
            </div>
            
            {data.length === 0 ? (
                <div className="flex w-full justify-center items-center mt-4">
                    <p className="text-2xl text-gray-soft font-mid border-2 border-gray-soft px-40 py-16 rounded-lg">Todavía no tenes carreras</p>
                </div>
            ) : (
                <ul className="w-full px-6 py-4 flex flex-col gap-4">
                    {data.map(career => (
                        <CareerCard key={career.id} career={career} />
                    ))}
                </ul>
            )}
        </div>
    );
}