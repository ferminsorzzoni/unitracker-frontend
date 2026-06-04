import { useCareerContext } from "../../../contexts/CareerContext"
import type { Category } from "../../../types/academic/category"
import SubcategoryCard from "../subcategory/SubcategoryCard";
import CreateSubcategoryButton from "../subcategory/CreateSubcategoryButton";
import DeleteCategoryButton from "./DeleteCategoryButton";
import EditCategoryButton from "./EditCategoryButton";

export default function CategoryCard({ category }: { category: Category }) {
    const { isOwner } = useCareerContext();
    return (
        <li>
            <section>
                <div className="flex justify-between items-center">
                    <h3 className="text-md font-bold text-gray-dark">{category.name}</h3>
                    {isOwner && (
                        <div className="flex gap-1">
                            <CreateSubcategoryButton categoryId={category.id} />
                            <EditCategoryButton category={category} />
                            <div className="my-auto h-4 border-r border-gray-soft"></div>
                            <DeleteCategoryButton categoryId={category.id}/>
                        </div>
                    )}
                </div>
                
                <ol>
                    {[...category.subcategories]
                    .sort((a, b) => a.order - b.order)
                    .map(subcategory => (
                        <SubcategoryCard 
                            key={subcategory.id} 
                            subcategory={subcategory} 
                        />
                    ))}
                </ol>
            </section>
        </li>
    );
}