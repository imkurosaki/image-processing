import { useRecoilState, useRecoilValue } from "recoil";
import { currentFilterAtom, rgbAtom } from "../atom/atom";
import { ChangeEventHandler, useRef, useState } from "react";
import { rgbFilter } from "../lib/data";
import { changeColor } from "../lib/tailwindFunctions";

export default function RGBToggle(props: { colorHandle: any }) {
    const currentFilterState: any = useRecoilValue(currentFilterAtom);
    const [rgbState, setRgbState]: any = useRecoilState(rgbAtom);
    const debouncingRef: any = useRef<number>(0);
    const [showInput, setShowInput]: any = useState({
        red: 0,
        green: 0,
        blue: 0
    })

    const toggleHandle: ChangeEventHandler<HTMLInputElement> = (e: any) => {
        setShowInput({ ...showInput, [e.target.name]: parseInt(e.target.value) });

        clearTimeout(debouncingRef.current);
        debouncingRef.current = setTimeout(() => {
            setRgbState({ ...rgbState, [e.target.name]: parseInt(e.target.value) });
            props.colorHandle(currentFilterState);
        }, 200)
    }

    return <div className="flex flex-col gap-5">
        {rgbFilter.map((filter: any) => {
            return <div key={filter.id} className="flex flex-col-reverse gap-3">
                <input
                    type="range"  
                    min={filter.min}
                    max={filter.max}
                    name={`${filter.name}`}
                    value={showInput[`${filter.initialValue}`]}
                    onChange={toggleHandle}
                    className={`${changeColor(filter.name)} w-[full] h-[1px] appearance-none cursor-pointer `}
                />
                <div className="flex gap-2 items-center justify-end">
                    <label className="text-sm font-light text-gray-500">{filter.name}</label>
                    <input
                        type="text"
                        value={showInput[`${filter.name}`]}
                        disabled
                        className="w-10 h-8 font-light text-xs border rounded-md border-gray-300 dark:bg-gray-100 text-center"
                    />
                </div>
            </div>
        })}
    </div>
}