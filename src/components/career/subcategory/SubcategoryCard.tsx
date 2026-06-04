import { useCareerContext } from "../../../contexts/CareerContext";
import type { Subcategory } from "../../../types/academic/subcategory";
import CreateSubjectButton from "../subject/CreateSubjectButton";
import SubjectCard from "../subject/SubjectCard";
import DeleteSubcategoryButton from "./DeleteSubcategoryButton";
import EditSubcategoryButton from "./EditSubcategoryButton";

export default function SubcategoryCard({ subcategory }: { subcategory: Subcategory }) {
    const { isOwner, subjectsMap } = useCareerContext();
    return (
        <li className="my-2">
            <section>
                <div className="flex justify-between items-center">
                    <h3 className="text-md text-gray-mid">{subcategory.name}</h3>
                    {isOwner && (
                        <div className="flex gap-1">
                            <CreateSubjectButton subcategoryId={subcategory.id} />
                            <EditSubcategoryButton subcategory={subcategory} />
                            <div className="my-auto h-4 border-r border-gray-soft"></div>
                            <DeleteSubcategoryButton subcategoryId={subcategory.id}/>
                        </div>
                    )}
                </div>
                
                <ol className="mt-2 gap-1 flex flex-col">
                    {[...subcategory.subjects]
                    .sort((a, b) => a.order - b.order)
                    .map(subject => (
                        <SubjectCard 
                            key={subject.id} 
                            subject={subjectsMap[subject.id]} 
                        />
                    ))}
                </ol>
            </section>
        </li>
    );
}