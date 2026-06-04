import { useParams } from "react-router-dom";
import { useGetCareer } from "../hooks/academic/useCareers";
import { getAxiosError } from "../utils/error";
import { useRemoveCategory, useUpdateCategory } from "../hooks/academic/useCategories";
import { useCreateSubcategory, useRemoveSubcategory, useUpdateSubcategory } from "../hooks/academic/useSubcategories";
import { useCreateSubject, useRemoveSubject, useUpdateSubject } from "../hooks/academic/useSubjects";
import { useCreatePrerequisite, useRemovePrerequisite } from "../hooks/academic/usePrerequisites";
import CategoryCard from "../components/career/category/CategoryCard";
import { useAuthStore } from "../stores/authStore";
import { CareerProvider } from "../contexts/CareerContext";
import type { ExtendedSubject } from "../types/academic/subject";
import CreateCategoryButton from "../components/career/category/CreateCategoryButton";
import CloneCareerButton from "../components/career/CloneCareerButton";
import { isPrerequisiteMet } from "../utils/career";

export default function Career() {
    const { careerId } = useParams<{ careerId: string }>();
    const user = useAuthStore(state => state.user);
    const { data, isLoading, error } = useGetCareer(careerId!);

    const { mutate: updateCategory, isPending: isUpdatingCategory } = useUpdateCategory(careerId!);
    const { mutate: deleteCategory, isPending: isDeletingCategory } = useRemoveCategory(careerId!);

    const { mutate: createSubcategory, isPending: isCreatingSubcategory } = useCreateSubcategory(careerId!);
    const { mutate: updateSubcategory, isPending: isUpdatingSubcategory } = useUpdateSubcategory(careerId!);
    const { mutate: deleteSubcategory, isPending: isDeletingSubcategory } = useRemoveSubcategory(careerId!);

    const { mutate: createSubject, isPending: isCreatingSubject } = useCreateSubject(careerId!);
    const { mutate: updateSubject, isPending: isUpdatingSubject } = useUpdateSubject(careerId!);
    const { mutate: deleteSubject, isPending: isDeletingSubject } = useRemoveSubject(careerId!);

    const { mutate: createPrerequisite, isPending: isCreatingPrerequisite } = useCreatePrerequisite(careerId!);
    const { mutate: removePrerequisite, isPending: isDeletingPrerequisite } = useRemovePrerequisite(careerId!);

    const categoryActions = {
        update: updateCategory,
        isUpdating: isUpdatingCategory,
        delete: deleteCategory,
        isDeleting: isDeletingCategory,
    };

    const subcategoryActions = {
        create: createSubcategory,
        isCreating: isCreatingSubcategory,
        update: updateSubcategory,
        isUpdating: isUpdatingSubcategory,
        delete: deleteSubcategory,
        isDeleting: isDeletingSubcategory,
    };

    const subjectActions = {
        create: createSubject,
        isCreating: isCreatingSubject,
        update: updateSubject,
        isUpdating: isUpdatingSubject,
        delete: deleteSubject,
        isDeleting: isDeletingSubject,
    };

    const prerequisiteActions = {
        create: createPrerequisite,
        isCreating: isCreatingPrerequisite,
        delete: removePrerequisite,
        isDeleting: isDeletingPrerequisite,
    };

    if(isLoading) return <div className="flex justify-center items-center flex-1"><div className="w-5 h-5 border-2 border-gray-soft border-t-primary rounded-full animate-spin" /></div>
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
                    prerequisites: subject.prerequisites.map(prerequisite => ({
                        ...prerequisite,
                        isMet: false,
                    })),
                    requiredBy: [],
                }
            ])
        );

    Object.values(subjectsMap).forEach(subject => {
        subject.prerequisites.forEach(prerequisite  => {
            const prerequisiteSubject = subjectsMap[prerequisite.prerequisiteId];
            prerequisiteSubject?.requiredBy.push(prerequisite);
            prerequisite.isMet = isPrerequisiteMet(prerequisiteSubject?.state, prerequisite.type);
        })
    })
        

    return (
        <div className="flex flex-col max-w-2xl mx-auto w-full py-2">
            <div className="flex justify-between border-b border-gray-mid w-full px-6 py-2">
                <div className="flex flex-col">
                    <h2 className="text-gray-dark text-xl font-bold">{data.name}</h2>
                    <p className="text-md text-gray-mid">{data.institution}</p>
                </div>

                {user && 
                    <div className="flex">
                        {isOwner ? (
                            <CreateCategoryButton careerId={careerId!}/>
                        ) : (
                            <CloneCareerButton careerId={careerId!}/>
                        )}
                    </div>
                }
            </div>

            
            
            
            <CareerProvider value={{
                isOwner,
                subjectsMap,
                categoryActions,
                subcategoryActions,
                subjectActions,
                prerequisiteActions,
            }}>
                <ol className="px-6 py-2">
                    {[...data.categories]
                    .sort((a, b) => a.order - b.order)
                    .map(category => (
                        <CategoryCard 
                            key={category.id} 
                            category={category} 
                        />
                    ))}
                </ol>
            </CareerProvider>
            
        </div>
    );
}