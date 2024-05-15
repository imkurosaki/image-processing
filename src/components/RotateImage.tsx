import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { imageAtom, imageObjectAtom, rotateImageAtom } from "../atom/atom";
import { rotateImage } from "../lib/rotateImage";


export default function RotateImage({ canvas }: {
    canvas: any
}) {
    const imageState: IimageAtom = useRecoilValue(imageAtom);
    const imageObjectState: File = useRecoilValue(imageObjectAtom);
    const [degree, setDegree] = useState(0);
    const rotateState = useSetRecoilState(rotateImageAtom)

    const toggleHandle: any = (e: any): void => {
        setDegree(e.target.value);
    }

    return <div >
        <div className="flex flex-col-reverse gap-3">
            <input
                type="range"
                min={0}
                max={360}
                value={degree}
                onChange={(e) => {
                    toggleHandle(e);
                }}
                className="w-[full] h-[1px] bg-gray-200  appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex gap-2 items-center justify-end">
                <label className="text-sm font-light text-gray-500">degree</label>
                <input
                    type="text"
                    value={degree}
                    placeholder="0"
                    onChange={toggleHandle}
                    className="w-10 h-8 font-light text-xs border rounded-md border-gray-300 dark:bg-gray-100 text-center"
                />
            </div>
        </div>
        <button onClick={() => {
            rotateState(degree);
            const reader: FileReader = new FileReader();
            reader.onload = (e: any): void => {
                const img: any = new Image();
                img.width = imageState.width;
                img.height = imageState.height;

                img.onload = async () => {
                    rotateImage(img, canvas, degree);
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(imageObjectState);
        }} className="bg-blue-700 cursor-pointer text-white px-3 z-10 py-2 mt-4 rounded-lg text-sm hover:bg-blue-900">Rotate</button>
    </div>
}