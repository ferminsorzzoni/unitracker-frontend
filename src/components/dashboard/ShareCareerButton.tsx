import { toast } from "sonner";
import shareImg from "../../assets/icons/share.svg";

export default function ShareCareerButton({ careerId }: { careerId: string }) {
    return (
        <button 
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigator.clipboard.writeText(`unitracker.dev/careers/${careerId}`);
                toast.success("Copiado al portapapeles!");
            }} 
            className="p-2 rounded-full border border-gray-light hover:border-gray-mid hover:shadow-lg transition-all"
        >
            <img src={shareImg} alt="Borrar carrera" className="w-4 h-4"/>
        </button>
    );
}