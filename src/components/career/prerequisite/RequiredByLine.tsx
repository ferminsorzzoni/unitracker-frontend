import { useCareerContext } from "../../../contexts/CareerContext";
import type { ExtendedPrerequisite } from "../../../types/academic/prerequisite";
import arrowRight from "../../../assets/icons/arrow-right.svg";
import dot from "../../../assets/icons/dot.svg";
import cross from "../../../assets/icons/cross.svg";
import tick from "../../../assets/icons/tick.svg";
import { TYPE_OPTIONS } from "../../../constants/stateOptions";

export default function RequiredByLine({ prerequisite }: { prerequisite: ExtendedPrerequisite }) {
    const { isOwner, subjectsMap } = useCareerContext();

    let img: string;
    if(!isOwner) {
        img = dot;
    } else if(prerequisite.isMet) {
        img = tick;
    } else {
        img = cross;
    }

    const type = TYPE_OPTIONS.find(t => t.value === prerequisite.type);

    return <li className="text-xs text-gray-dark flex items-center gap-1.5">
        <img className="w-3 h-3" src={img}/>
        {subjectsMap[prerequisite.subjectId].name}
        <img className="w-3 h-3" src={arrowRight}/>
        <div className={`text-xs text-gray-dark ${type?.background} border-0 rounded pl-2 pr-2 py-0.5 flex justify-between items-center gap-2.5`}>
            <span>{type?.label}</span>
        </div>
    </li>
}