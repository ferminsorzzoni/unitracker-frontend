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
        <main>
            <div className="flex justify-between">
                <h2>Tus carreras</h2>

                <div>
                    <CreateCareerModal />
                </div>
            </div>
            
            {data.length === 0 ? (
                <div>
                    <p>Todavía no tenes carreras</p>
                </div>
            ) : (
                <ul>
                    {data.map(career => (
                        <CareerCard key={career.id} career={career} />
                    ))}
                </ul>
            )}
        </main>
    );
}