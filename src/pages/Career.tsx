import { useParams } from "react-router-dom";
import { useCloneCareer, useGetCareer } from "../hooks/academic/useCareers";
import { getAxiosError } from "../utils/error";
import { useRemoveCategory, useUpdateCategory } from "../hooks/academic/useCategories";
import { useCreateSubcategory, useRemoveSubcategory, useUpdateSubcategory } from "../hooks/academic/useSubcategories";
import { useCreateSubject, useRemoveSubject, useUpdateSubject } from "../hooks/academic/useSubjects";
import { useCreatePrerequisite, useRemovePrerequisite } from "../hooks/academic/usePrerequisites";
import CategoryCard from "../components/career/category/CategoryCard";
import { useAuthStore } from "../stores/authStore";
import { CareerProvider } from "../contexts/CareerContext";
import type { ExtendedSubject } from "../types/academic/subject";
import CreateCategoryButton from "../components/career/CreateCategoryButton";
import CloneCareerButton from "../components/career/CloneCareerButton";

export default function Career() {
    const { careerId } = useParams<{ careerId: string }>();
    const user = useAuthStore(state => state.user);
    const { data, isLoading, error } = useGetCareer(careerId!);

    const { mutate: cloneCareer, isPending: isCloningCareer } = useCloneCareer();
    isCloningCareer

    const { mutate: updateCategory } = useUpdateCategory(careerId!);
    const { mutate: deleteCategory } = useRemoveCategory(careerId!);

    const { mutate: createSubcategory } = useCreateSubcategory(careerId!);
    const { mutate: updateSubcategory } = useUpdateSubcategory(careerId!);
    const { mutate: deleteSubcategory } = useRemoveSubcategory(careerId!);

    const { mutate: createSubject } = useCreateSubject(careerId!);
    const { mutate: updateSubject } = useUpdateSubject(careerId!);
    const { mutate: deleteSubject } = useRemoveSubject(careerId!);

    const { mutate: createPrerequisite } = useCreatePrerequisite(careerId!);
    const { mutate: removePrerequisite } = useRemovePrerequisite(careerId!);

    const categoryActions = {
        update: updateCategory,
        delete: deleteCategory,
    };

    const subcategoryActions = {
        create: createSubcategory,
        update: updateSubcategory,
        delete: deleteSubcategory,
    };

    const subjectActions = {
        create: createSubject,
        update: updateSubject,
        delete: deleteSubject,
    };

    const prerequisiteActions = {
        create: createPrerequisite,
        delete: removePrerequisite,
    };

    if(isLoading) return <p>Cargando...</p>
    if(error) {
        const { message } = getAxiosError(error);
        return <p>{message}</p>
    }
    if(!data) return null;

    const isOwner = data.userId === user?.id;

    const subjectsMap: Record<string, ExtendedSubject> = 
        Object.fromEntries(
            data.categories
            .flatMap(c => c.subcategories)
            .flatMap(s => s.subjects)
            .map(subject => [
                subject.id, 
                {
                    ...subject,
                    requiredBy: [],
                }
            ])
        );

    Object.values(subjectsMap).forEach(subject => {
        subject.prerequisites.forEach(prerequisite  => {
            subjectsMap[prerequisite.prerequisiteId]
            ?.requiredBy
            .push(prerequisite)
        })
    })
        

    return (
        <div className="flex flex-col max-w-2xl mx-auto w-full py-2">
            <div className="flex justify-between border-b border-gray-mid w-full px-6 py-2">
                <div className="flex flex-col">
                    <h2 className="text-gray-dark text-xl font-bold">{data.name}</h2>
                    <p className="text-md text-gray-mid">{data.institution}</p>
                </div>

                <div className="flex">
                    {isOwner ? (
                        <CreateCategoryButton careerId={careerId!}/>
                    ) : (
                        <CloneCareerButton careerId={careerId!}/>
                    )}
                </div>
            </div>

            
            
            
            <CareerProvider value={{
                isOwner,
                subjectsMap,
                categoryActions,
                subcategoryActions,
                subjectActions,
                prerequisiteActions,
            }}>
                <ul className="px-6 py-2">
                    {data.categories.map(category => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </ul>
            </CareerProvider>
            
        </div>
    );
}