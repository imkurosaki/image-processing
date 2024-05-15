import { useRecoilValue } from "recoil";
import { imageAtom, imageObjectAtom } from "../atom/atom";
import { useState } from "react";
import { moveImage } from "../lib/moveImage";

export default function Coordinates({ canvas }: {
    canvas: any
}) {
    const imageState: IimageAtom = useRecoilValue(imageAtom);
    const imageObjectState: File = useRecoilValue(imageObjectAtom);
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const mirrorHandling = () => {
        const reader: FileReader = new FileReader();
        reader.onload = (e: any): void => {
            const img: any = new Image();
            img.width = imageState.width;
            img.height = imageState.height;

            img.onload = () => {
                moveImage(img, canvas, x, y);
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(imageObjectState);
    }

    return <div className="flex gap-3 mt-3">
        <div className="flex gap-2 items-center justify-end">
            <label className="text-sm font-light text-gray-500">x</label>
            <input
                type="text"
                placeholder="0"
                onChange={(e: any) => { setX(e.target.value) }}
                className="w-10 h-8 font-light text-xs border rounded-md border-gray-300 dark:bg-gray-100 text-center"
            />
        </div>
        <div className="flex gap-2 items-center justify-end">
            <label className="text-sm font-light text-gray-500">y</label>
            <input
                type="text"
                placeholder="0"
                onChange={(e: any) => { setY(e.target.value) }}
                className="w-10 h-8 font-light text-xs border rounded-md border-gray-300 dark:bg-gray-100 text-center"
            />
        </div>
        <button onClick={mirrorHandling} className="bg-blue-700 cursor-pointer text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-900">Apply</button>
    </div>
}