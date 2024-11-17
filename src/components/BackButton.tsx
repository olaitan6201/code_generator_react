import { BsChevronLeft } from "react-icons/bs";
import String from "@/components/String";
import { useNavigate } from "react-router";

export default function BackButton({ event }: { event?: () => void }) {
    const navigate = useNavigate()

    const handleNavigateBack = () => {
        if (event) {
            return event()
        }
        navigate(-1)
    }

    return (
        <div className="flex items-center py-2 gap-2 w-32 controlled-text font-extrabold cursor-pointer hover:brightness-75 active:brightness-90" onClick={handleNavigateBack}>
            <BsChevronLeft />
            <span><String txtKey="Back" /></span>
        </div>
    )
}
