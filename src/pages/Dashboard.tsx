import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { blurImageAtom, enhancersAtom, fileBackUpAtom, filterSelectionAtom, imageAtom, imageObjectAtom, rangeTresholdAtom, rgbAtom, singleTresholdAtom, toggleAtom } from "../atom/atom";
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
import RangeSliderTreshold from "../components/RangeSliderTreshold";

export default function Dashboard() {
    const imageState: IimageAtom = useRecoilValue(imageAtom);
    const imageObjectState: File = useRecoilValue(imageObjectAtom);
    const fileBackUpState: File = useRecoilValue(fileBackUpAtom);
    const [editFlag, setEditFlag] = useState(true)
    const [thresholdFlag, setThresholdFlag] = useState(false);
    const [currentFilter, setCurrentFilter] = useRecoilState(currentFilterAtom);
    const [rgbAtomState, setRgbAtom] = useRecoilState(rgbAtom);
    const [enhancersState, setEnhancersAtom] = useRecoilState(enhancersAtom);
    const canvasRef: any = useRef(null)
    const blurImageState = useRecoilValue(blurImageAtom);
    const filterSelectionState: boolean = useRecoilValue(filterSelectionAtom);
    const toggleAtomState = useRecoilValue(toggleAtom);
    const [toggleThreshold, setToggleThreshold] = useState(true);
    const singleTresholdState = useRecoilValue(singleTresholdAtom);
    const rangeTresholdState = useRecoilValue(rangeTresholdAtom);
    const canvasSegmentationRef: any = useRef(null);
    const [segmentationFlag, setSegmentationFlag] = useState(false);

    const colorHandle: Function = (color: string, inputThreshold?: any): any => {
        setCurrentFilter(color);

        const reader: FileReader = new FileReader();
        reader.onload = (e: any): void => {
            const img: any = new Image();
            img.width = imageState.width;
            img.height = imageState.height;

            img.onload = () => {
                if (color === "binary" || color === "binaryRange") {
                    colorOptions(img, canvasRef.current, color, enhancersState, rgbAtomState, inputThreshold);
                }
                else {
                    setSegmentationFlag(false);
                    colorOptions(img, canvasRef.current, color, enhancersState, rgbAtomState);
                }
                setThresholdFlag(color === "binary" || color === "binaryRange" ? true : false);
                setEditFlag(false);
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(color === "none" ? fileBackUpState : imageObjectState);
    }

    const segmentationHandle: Function = (thresholdType: string): any => {
        const reader: FileReader = new FileReader();
        reader.onload = (e: any): void => {
            const img: any = new Image();
            img.width = imageState.width;
            img.height = imageState.height;

            img.onload = () => {
                if (thresholdType === "segmentedBinary") {
                    colorOptions(img, canvasSegmentationRef.current, thresholdType, enhancersState, rgbAtomState, singleTresholdState);
                } else {
                    colorOptions(img, canvasSegmentationRef.current, thresholdType, enhancersState, rgbAtomState, rangeTresholdState);
                }
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(imageObjectState);
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

    useEffect(() => {
        colorHandle((currentFilter === "") ? "none" : currentFilter)
    }, [rgbAtomState, enhancersState]);

    return <div>
        <div className="grid grid-cols-12">
            <div className="col-span-3 border-e border-gray-300 h-screen sticky top-0">
                <BarFilter />
                {!filterSelectionState
                    ?
                    <Adjustment colorHandle={colorHandle} />
                    :
                    <Filter colorHandle={colorHandle} originalImage={originalImage} />
                }
                <div className="w-full flex justify-end px-5 absolute bottom-5">
                    <BackButton />
                </div>
            </div>
            <div className="col-span-9 flex flex-col justify-center items-center bg-gray-200 py-10">
                <div className="flex flex-col gap-7">
                    <div className="flex justify-between">
                        <Toggle />
                    </div>

                    {thresholdFlag &&
                        <div>
                            <div>
                                <p className="font-medium text-xs underline">Threshold</p>
                                <div className="flex gap-4 mt-3">
                                    <button onClick={() => { setToggleThreshold(true) }} className={`border rounded-md border-black px-2 py-2 font-medium hover:bg-black hover:text-white ${toggleThreshold && "bg-black text-white"}`}>Single Treshold</button>
                                    <button onClick={() => { setToggleThreshold(false) }} className={`border rounded-md border-black px-2 py-2 font-medium hover:bg-black hover:text-white ${!toggleThreshold && "bg-black text-white"}`}>Threshold T1 & T2</button>
                                </div>
                            </div>
                            {toggleThreshold && thresholdFlag ? <SliderTreshold thresholdFn={colorHandle} /> : <RangeSliderTreshold thresholdFn={colorHandle} />}
                        </div>
                    }

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

                    {thresholdFlag &&
                        <div>
                            <div className="text-center my-5">
                                <p className=" font-light text-xs mb-4">Click this for segmented image</p>
                                <div className="flex justify-center">
                                    <button onClick={() => {
                                        // pass thresholdFlag if the statement is t rue otherwise rangeThresholdFlage
                                        setSegmentationFlag(true);
                                        segmentationHandle(toggleThreshold && thresholdFlag ? "segmentedBinary" : "segmentedBinaryRange");
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 hover:w-14 hover:h-14">
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {segmentationFlag &&
                                <div className={`h-[500px] w-[${imageState.width}] rounded-lg border border-gray-700 overflow-hidden shadow-2xl shadow-black`}>
                                    <canvas
                                        ref={canvasSegmentationRef}
                                        width={imageState.width}
                                        height={imageState.height}
                                        className={`h-[500px]`}
                                    >
                                    </canvas>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
}