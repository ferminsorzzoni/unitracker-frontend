import { useCareerContext } from "../../../contexts/CareerContext"
import type { Category } from "../../../types/academic/category"
import SubcategoryCard from "../SubcategoryCard";
import CreateSubcategoryButton from "./CreateSubcategoryButton";
import DeleteCategoryButton from "./DeleteCategoryButton";
import EditCategoryButton from "./EditCategoryButton";

export default function CategoryCard({ category }: { category: Category }) {
    const { isOwner, categoryActions, subcategoryActions } = useCareerContext();
    return (
        <li>
            <section>
                <div>
                    <h3 className="text-md font-bold text-gray-dark">{category.name}</h3>
                    {isOwner && (
                        <div>
                            <CreateSubcategoryButton />
                            <EditCategoryButton />
                            <DeleteCategoryButton />
                        </div>
                    )}
                </div>
                
                <ul>
                    {category.subcategories.map(subcategory => (
                        <SubcategoryCard key={category.id} subcategory={subcategory} />
                    ))}
                </ul>
            </section>
        </li>
    );
}