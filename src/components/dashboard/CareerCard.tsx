import { Link } from "react-router-dom";
import type { CareerCardDTO } from "../../types/academic/career";
import DeleteCareerButton from "./DeleteCareerButton";
import EditCareerButton from "./EditCareerButton";
import ShareCareerButton from "./ShareCareerButton";

export default function CareerCard({ career }: { career: CareerCardDTO }) {
    return (
        <li className="relative">
            <Link to={`/careers/${career.id}`} className="flex flex-col gap-4 rounded-lg border-l-4 p-4 bg-gray-light border-primary shadow-sm hover:shadow-md hover:border-primary-dark transition-all">
                <div className="flex justify-between pr-24">
                    <h3 className="text-gray-dark font-medium text-lg sm:text-2xl">{career.name}</h3>
                </div>
                <p className="text-gray-mid text-md sm:text-xl">{career.institution}</p>
            </Link>
            <div className="absolute top-4 right-4 z-10">
                <ShareCareerButton careerId={career.id} />
                <EditCareerButton career={career} />
                <DeleteCareerButton careerId={career.id} />
            </div>
        </li>
    );
}