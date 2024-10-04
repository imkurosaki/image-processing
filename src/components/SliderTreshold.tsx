import { useRef, useState } from "react"
import { useSetRecoilState } from "recoil";
import { singleTresholdAtom } from "../atom/atom";

export default function SliderTreshold(props: { thresholdFn: any }) {
  const [threshold, setThreshold] = useState(128);
  const debouncingRef: any = useRef<number>(0);
  const setSingleTresholdAtom = useSetRecoilState(singleTresholdAtom);

  function inputHandler(inputNumber: number) {
    setThreshold(inputNumber);

    clearTimeout(debouncingRef.current)
    debouncingRef.current = setTimeout(() => {
      setSingleTresholdAtom(inputNumber);
      props.thresholdFn("binary", inputNumber)
    }, 300);
  }

  return <div className="flex items-end justify-end gap-6">
    <div className="flex flex-col-reverse items-end gap-3">
      <input
        type="range"
        min={0}
        max={255}
        onChange={(e) => { inputHandler(parseInt(e.target.value)) }}
        className="w-[300px] h-[1px] bg-gray-200 cursor-pointer dark:bg-gray-700"
      />
      <div className="flex gap-2 items-center">
        <div className="flex gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
          </svg>
          <label className="text-sm font-bold">Threshold</label>
        </div>
        <input
          type="text"
          value={threshold}
          onChange={(e) => {
            const inputNumber: number = parseInt(e.target.value) || 0
            if (inputNumber >= 0 && inputNumber <= 255) {
              inputHandler(inputNumber);
            }
          }}
          className="w-10 h-8 font-light text-xs border rounded-md border-gray-300 dark:bg-gray-100 text-center"
        />
      </div>
    </div>
  </div>
}
