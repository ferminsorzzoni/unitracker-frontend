import { useCareerContext } from "../../contexts/CareerContext";
import type { Subcategory } from "../../types/academic/subcategory";
import SubjectCard from "./SubjectCard";

export default function SubcategoryCard({ subcategory }: { subcategory: Subcategory }) {
    const { isOwner, subcategoryActions } = useCareerContext();
    return (
        <li>
            <section>
                <div>
                    <h3 className="text-gray-mid">{subcategory.name}</h3>
                    // boton de editar
                    // boton de borrar
                </div>
                
                <ul>
                    {subcategory.subjects.map(subject => (
                        <SubjectCard key={subject.id} subject={subject} />
                    ))}
                </ul>
            </section>
        </li>
    );
}