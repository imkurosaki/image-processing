import { useRef, useState } from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import { useSetRecoilState } from "recoil";
import { rangeTresholdAtom } from "../atom/atom";


export default function RangeSliderTreshold(props: { thresholdFn: any }) {
    const debouncingRef: any = useRef<number>(0);
    const [range, setRange] = useState([0, 255]); // Initial range
    const setRangeTresholdAtom = useSetRecoilState(rangeTresholdAtom);

    const handleRangeChange = (newRange: any) => {
        setRange(newRange);

        clearTimeout(debouncingRef.current)
        debouncingRef.current = setTimeout(() => {
            setRangeTresholdAtom({
                t1: range[0],
                t2: range[1]
            })
            props.thresholdFn("binaryRange", {t1: range[0], t2: range[1]})
        }, 300);
    };

    return (
        <div className="mt-6 flex flex-col gap-3">
            <Slider
                range
                min={0}
                max={255}
                step={1}
                value={range}
                onChange={handleRangeChange}
                trackStyle={{ backgroundColor: "blue", height: 2 }}
                railStyle={{ backgroundColor: "black", height: 1 }}
                handleStyle={{
                    borderColor: "blue",
                    backgroundColor: "blue"
                }}
            />
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <p className="font-medium text-xs">T1</p>
                    <p className="w-10 py-1 font-light text-xs border rounded-md border-gray-300 dark:bg-gray-100 text-center">{range[0]}</p>
                </div>
                <div className="flex items-center gap-3">
                    <p className="font-medium text-xs">T2</p>
                    <p className="w-10 py-1 font-light text-xs border rounded-md border-gray-300 dark:bg-gray-100 text-center">{range[1]}</p>
                </div>
            </div>
        </div>
    );
}