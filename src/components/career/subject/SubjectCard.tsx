import { useState } from "react";
import { useCareerContext } from "../../../contexts/CareerContext";
import type { ExtendedSubject } from "../../../types/academic/subject";
import chevronIcon from "../../../assets/icons/chevron.svg"
import lockIcon from "../../../assets/icons/lock.svg"
import EditSubjectButton from "./EditSubjectButton";
import DeleteSubjectButton from "./DeleteSubjectButton";
import SubjectStateSelect from "./SubjectStateSelect";
import { STATE_OPTIONS } from "../../../constants/stateOptions";
import { isSubjectAvailable } from "../../../utils/career";
import CreatePrerequisiteButton from "../prerequisite/CreatePrerequisiteButton";
import PrerequisiteLine from "../prerequisite/PrerequisiteLine";
import RequiredByLine from "../prerequisite/RequiredByLine";

export default function SubjectCard({ subject }: { subject: ExtendedSubject }) {
    const [isOpen, setIsOpen] = useState(false);
    const { isOwner } = useCareerContext();

    const isAvailable = isSubjectAvailable(subject);

    const borderColor = isAvailable ? STATE_OPTIONS.find((state) => state.value === subject.state)?.border : "gray-mid";

    return (
        <li className={`rounded-lg py-2 px-3 bg-gray-light -mx-3 border-l-4 ${borderColor} transition-colors`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        <img src={chevronIcon} alt="Expandir materia" className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
                    </button>
                    <div className="flex flex-col ml-3">
                        <span>{subject.name}</span>
                        {subject.weeklyMinutes ? (
                            <span className="text-xs text-gray-mid">{subject.weeklyMinutes / 60}hs</span>
                        ) : (
                            <span></span>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    {isOwner &&
                    <div className="flex flex-col gap-1.5">
                        <div className="flex gap-1 justify-end">
                            {subject.mark && subject.state === "PASSED" && <span className="text-xs flex items-center text-gray-mid">Nota: {subject.mark}</span>}
                            <EditSubjectButton subject={subject}/>
                            <div className="my-auto h-4 border-r border-gray-soft"></div>
                            <DeleteSubjectButton subjectId={subject.id}/>
                        </div>
                        {isAvailable ? (
                            <SubjectStateSelect subjectId={subject.id} currentState={subject.state}/>
                        ) : (
                            <div className="text-xs text-gray-dark bg-gray-mid border-0 rounded pl-2 pr-2 py-0.5 cursor-not-allowed flex justify-between items-center gap-2.5">
                                <span>Bloqueada</span>
                                <img src={lockIcon} className="w-3 h-3"/>
                            </div>
                        )}
                    </div>
                    }
                </div>
            </div>

            <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pl-7 pt-3 flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p className="text-xs text-gray-dark font-bold">Materias correlativas:</p>
                        {isOwner && <CreatePrerequisiteButton subject={subject}/>}
                    </div>
                    <ul className="flex flex-col gap-1">
                        {[...subject.prerequisites]
                        .map(prerequisite => (
                            <PrerequisiteLine 
                                key={prerequisite.id} 
                                prerequisite={prerequisite} 
                            />
                        ))}
                    </ul>
                    <p className="text-xs text-gray-dark font-bold">Correlativa de:</p>
                    <ul className="mb-1">
                        {[...subject.requiredBy]
                        .map(prerequisite => (
                            <RequiredByLine 
                                key={prerequisite.id} 
                                prerequisite={prerequisite} 
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </li>
    );
}