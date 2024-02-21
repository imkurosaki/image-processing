import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { blurImageAtom, enhancersAtom, fileBackUpAtom, filterSelectionAtom, imageAtom, imageObjectAtom, rgbAtom, toggleAtom } from "../atom/atom";
import { useEffect, useRef, useState } from "react";
import { colorOptions } from "../lib/filterColors";
import SliderTreshold from "../components/SliderTreshold";
import Filter from "../components/Filter";
import Adjustment from "../components/Adjustment";
import { currentFilterAtom } from "../atom/atom";
import { getBlur } from "../lib/tailwindFunctions";
import BarFilter from "../components/BarFilter";
import Toggle from "../components/Toggle";
import BackButton from "../components/BackButton";

export default function Dashboard() {
    const imageState: IimageAtom = useRecoilValue(imageAtom);
    const imageObjectState: File = useRecoilValue(imageObjectAtom);
    const fileBackUpState: File = useRecoilValue(fileBackUpAtom);
    const [editFlag, setEditFlag] = useState(true)
    const [thresholdFlag, setThresholdFlag] = useState(false);
    const setCurrentFilter: Function = useSetRecoilState(currentFilterAtom);
    const [rgbAtomState, setRgbAtom] = useRecoilState(rgbAtom);
    const [enhancersState, setEnhancersAtom] = useRecoilState(enhancersAtom);
    const canvasRef: any = useRef(null)
    const blurImageState = useRecoilValue(blurImageAtom);
    const filterSelectionState: boolean = useRecoilValue(filterSelectionAtom);
    const toggleAtomState = useRecoilValue(toggleAtom);

    const colorHandle: Function = (color: string, inputThreshold?: any): any => {
        setCurrentFilter(color);

        const reader: FileReader = new FileReader();
        reader.onload = (e: any): void => {
            const img: any = new Image();
            img.width = imageState.width;
            img.height = imageState.height;

            img.onload = () => {
                if (color === "binary") {
                    colorOptions(img, canvasRef.current, color, enhancersState, rgbAtomState, inputThreshold);
                }
                else {
                    colorOptions(img, canvasRef.current, color, enhancersState, rgbAtomState);
                }
                setThresholdFlag(color === "binary" ? true : false);
                setEditFlag(false);
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(color === "none" ? fileBackUpState : imageObjectState);
    }

    const originalImage: Function = (): void => {
        setEnhancersAtom({
            opacity: 255,
            brightness: 0,
            saturation: 0,
            blur: 45
        })
        setRgbAtom({
            red: 0,
            blue: 0,
            green: 0
        })
    }

    useEffect(() => colorHandle("none"), []);

    return <div className={`h-screen `}>
        <div className="grid grid-cols-12">
            <div className="col-span-3 border-e border-gray-300 relative">
                <BarFilter />
                {!filterSelectionState
                    ?
                    <Adjustment colorHandle={colorHandle} />
                    :
                    <Filter colorHandle={colorHandle} originalImage={originalImage} />
                }
                <div className="w-full flex justify-end px-5 absolute bottom-5">
                    <BackButton/>
                </div>
            </div>
            <div className="col-span-9 flex flex-col justify-center items-center h-screen bg-gray-200">
                <div className="flex flex-col gap-8">
                    <div className="flex justify-between">
                        <Toggle />
                        {thresholdFlag && <SliderTreshold thresholdFn={colorHandle} />}
                    </div>

                    <div className={`h-[500px] w-[${imageState.width}] rounded-lg border border-gray-700 overflow-hidden shadow-2xl shadow-black`}>
                        {editFlag || toggleAtomState ? <img src={`${imageState.image}`} className="w-[full] h-[500px]" /> : ""}
                        <canvas
                            ref={canvasRef}
                            width={imageState.width}
                            height={imageState.height}
                            className={`${editFlag || toggleAtomState ? "hidden" : ""} h-[500px] ${getBlur(blurImageState)}`}
                        >
                        </canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
}