import { useRecoilState } from "recoil"
import { toggleAtom } from "../atom/atom"


export default function Toggle() {
    const [toggleAtomState, setToggleAtom] = useRecoilState(toggleAtom);

    const toggleHandler: Function = (): void => {
        setToggleAtom(toggleAtomState ? false : true);
    }
    
    return <>
        <label className="inline-flex cursor-pointer items-end">
            <input type="checkbox" value="" className="sr-only peer" onChange={() => toggleHandler()}/>
            <div className="relative w-9 h-5 peer-focus:outline-none peer-focus:ring-4 rounded-full peer bg-blue-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600">
            </div>
            <span className="ms-3 text-sm font-base text-gray-900 ">{`${toggleAtomState ? "Original image" : "Edited mode"}`}</span>
        </label>
    </>

}