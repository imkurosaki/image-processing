import { useRecoilValue } from "recoil";
import { imageAtom, imageObjectAtom } from "../atom/atom";
import { mirroringImage } from "../lib/mirroring";

export default function Mirroring({ canvas }: {
    canvas: any
}) {
    const imageState: IimageAtom = useRecoilValue(imageAtom);
    const imageObjectState: File = useRecoilValue(imageObjectAtom);

    const mirrorHandling = (type: string) => {
        const reader: FileReader = new FileReader();
        reader.onload = (e: any): void => {
            const img: any = new Image();
            img.width = imageState.width;
            img.height = imageState.height;

            img.onload = () => {
                mirroringImage(img, canvas, type);
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(imageObjectState);
    }

    return <div className="flex gap-3">
        <button onClick={() => {
            mirrorHandling("vertical")
        }} className="bg-blue-700 cursor-pointer text-white px-3 z-10 py-2 mt-4 rounded-lg text-sm hover:bg-blue-900">Vertical</button>
        <button onClick={() => {
            mirrorHandling("horizontal")
        }} className="bg-blue-700 cursor-pointer text-white px-3 z-10 py-2 mt-4 rounded-lg text-sm hover:bg-blue-900">Horizontal</button>
    </div>
}