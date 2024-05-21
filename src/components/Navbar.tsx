import { userAtom } from "@/atom/atom"
import { useRecoilValue } from "recoil"


export default function Navbar() {
    const userState: {
        username: string,
        name: string,
        password: string,
        hashPassword: string
    } = useRecoilValue(userAtom)[0]
    const name: string = userState.name;

    return <div className="flex justify-between items-center px-16 py-3 border-b ">
        <p className=" font-bold text-2xl tracking-wide">Editor</p>
        <p className="uppercase px-4 py-2 bg-gray-200 border-gray-500 border rounded-full font-bold">{name[0]}</p>
    </div>
}