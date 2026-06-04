import { STATE_OPTIONS } from "../../../constants/stateOptions";
import { useCareerContext } from "../../../contexts/CareerContext";
import type { SubjectState } from "../../../types/academic/subject";

export default function SubjectStateSelect({ subjectId, currentState }: { subjectId: string, currentState: SubjectState }) {
    const { subjectActions } = useCareerContext();
    
    return (
        <select 
            className={`text-xs text-gray-dark ${STATE_OPTIONS.find((state) => state.value === currentState)?.background} border-0 rounded pl-2 pr-8.5 py-0.5 cursor-pointer transition-colors duration-300`}
            value={currentState}
            onChange={(e) => subjectActions.update({ subjectId: subjectId, body: { state: e.target.value as SubjectState }})}
        >
            {STATE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    );
}