import { Link } from "react-router-dom";
import type { CareerCardDTO } from "../types/academic/career";

export default function CareerCard({ career }: { career: CareerCardDTO }) {
    return (
        <li>
            <Link to={`/careers/${career.id}`} className="flex flex-col gap-4 rounded-lg border-l-4 p-4 border-primary shadow-sm hover:shadow-md hover:border-primary-dark transition-all">
                <h3 className="text-gray-dark font-medium text-2xl">{career.name}</h3>
                <p className="text-gray-mid text-xl">{career.institution}</p>
            </Link>
        </li>
    );
}