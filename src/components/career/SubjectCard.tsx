import { useCareerContext } from "../../contexts/CareerContext";
import type { Subject } from "../../types/academic/subject";

export default function SubjectCard({ subject }: { subject: Subject }) {
    const { isOwner, subjectActions, subjectsMap } = useCareerContext();
    return (
        <li>
            <section>
                
            </section>
        </li>
    );
}