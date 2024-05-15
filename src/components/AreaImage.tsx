import { useRecoilValue } from "recoil"
import { areaImageAtom } from "../atom/atom"

function numberWithCommas(value: number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function AreaImage({ children }: {
    children: any
}) {
    const areaState: any = useRecoilValue(areaImageAtom)

    return <div className="text-sm  border border-gray-500 p-4 rounded-lg bg-slate-100">
        <div className="flex gap-6">
            <div className="font-light flex flex-col gap-2">
                <p>Area of the image:</p>
                <p>Area of the object:</p>
                <p>Centroid of the image:</p>
                <p>Centroid of the object:</p>
            </div>
            <div className="font-semibold flex flex-col gap-2 tracking-widest">
                <p>{numberWithCommas(areaState.areaOfImage)}</p>
                <p>{numberWithCommas(areaState.areaOfObject)}</p>
                <p>x: {Math.floor(areaState.centroidImage.x)}, y: {Math.floor(areaState.centroidImage.y)}</p>
                <p>x: {Math.floor(areaState.centroidObject.x)}, y: {Math.floor(areaState.centroidObject.y)}</p>
            </div>
        </div>
        <div className="mt-5">
        {children}
        </div>
    </div>
}