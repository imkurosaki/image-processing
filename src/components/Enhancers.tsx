import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { blurImageAtom, currentFilterAtom, enhancersAtom } from "../atom/atom"
import { useRef, useState } from "react";
import { enhancersFilter } from "../lib/data";

export default function Enhancers(props: { colorHandle: Function }) {
    const currentFilterState: any = useRecoilValue(currentFilterAtom);
    const [enhancersState, setEnhancersState]: any = useRecoilState(enhancersAtom);
    const debouncingRef: any = useRef<number>(0);
    const blurImageState: Function = useSetRecoilState(blurImageAtom); 
    const [showInput, setShowInput]: any = useState({
        opacity: 255,
        brightness: 0,
        saturation: 0,
        blur: 0
    })

    const toggleHandle: any = (e: any, enhancer: string): void => {
        setShowInput({ ...showInput, [e.target.name]: parseInt(e.target.value) });

        clearTimeout(debouncingRef.current);
        debouncingRef.current = setTimeout(() => {
            if(enhancer === "blur") {
                blurImageState(parseInt(e.target.value));
            } else {
                setEnhancersState({ ...enhancersState, [e.target.name]: parseInt(e.target.value) });
                props.colorHandle(currentFilterState);
            }
        }, 200)
    }

    return <div className="flex flex-col gap-5">
        {enhancersFilter.map((enhancer: any) => {
            return <div key={enhancer.id} className="flex flex-col-reverse gap-3">
                <input
                    type="range"
                    min={enhancer.min}
                    max={enhancer.max}
                    name={`${enhancer.name}`}
                    value={showInput[`${enhancer.initialValue}`]}
                    onChange={(e) => {
                        toggleHandle(e, enhancer.name);
                    }}
                    className="w-[full] h-[1px] bg-gray-200  appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex gap-2 items-center justify-end">
                    <label className="text-sm font-light text-gray-500">{enhancer.name}</label>
                    <input
                        type="text"
                        value={showInput[`${enhancer.name}`]}
                        disabled
                        className="w-10 h-8 font-light text-xs border rounded-md border-gray-300 dark:bg-gray-100 text-center"
                    />
                </div>
            </div>
        })}

    </div>
}