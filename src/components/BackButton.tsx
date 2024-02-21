import { useNavigate } from "react-router-dom"


export default function BackButton() {
    const navigate = useNavigate();

    const backHandler: Function = (): void => {
        navigate("/");
    }
    
    return <button
        onClick={() => backHandler()}
        className="bg-blue-700 text-white px-3 py-1 rounded-md shadow-md shadow-gray-700 hover:bg-blue-800 "
    >
        Back
    </button>
}