import { useEffect, useState } from "react"
import { convolutionFilters } from "../lib/convolutionFilter"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { imageAtom, imageObjectAtom, kernelAtom } from "../atom/atom";

const filter: any[] = [
    {
        type: "smoothing",
        kernel: [1, 1, 1, 1, 2, 1, 1, 1, 1]
    },
    {
        type: "gaussian",
        kernel: [1, 2, 3, 2, 1, 2, 4, 5, 4, 2, 3, 5, 6, 5, 3, 2, 4, 5, 4, 2, 1, 2, 3, 2, 1]
    },
    {
        type: "sharpening",
        kernel: [0, -1, 0,
            -1, 5, -1,
            0, -1, 0]
    },
    {
        type: "emboss-laplascian",
        kernel: [-1, 0, -1,
            0, 4, 0,
        -1, 0, -1]
    },
    {
        type: "emboss-horizontal",
        kernel: [0, 0, 0,
            -1, 2, -1,
            0, 0, 0]
    },
    {
        type: "emboss-lossy",
        kernel: [1, -2, 1,
            -2, 4, -2,
            -2, 1, -2]
    },
    {
        type: "mean-removal",
        kernel: [-1, -1, -1,
        -1, 9, -1,
        -1, -1, -1]
    },
]

export default function ConvolutionFilters({ canvas }: {
    canvas: any
}) {
    const imageState: IimageAtom = useRecoilValue(imageAtom);
    const imageObjectState: File = useRecoilValue(imageObjectAtom);
    const [kernel, setKernel] = useState(filter[0].kernel)
    const [typeKernel, setTypeKernel] = useState("smoothing")
    const [kernelFlag, setKernelFlagState] = useRecoilState(kernelAtom)

    const onChangeHandle = (e: any) => {
        kernel[Number(e.target.name)] = Number(e.target.value)
        submitKernelHandle([...kernel], typeKernel);
    }

    const submitKernelHandle = (kernelArr: any, typeKernel: string) => {
        const reader: FileReader = new FileReader();
        reader.onload = (e: any): void => {
            const img: any = new Image();
            img.width = imageState.width;
            img.height = imageState.height;

            img.onload = async () => {
                await convolutionFilters(img, canvas, kernelArr, typeKernel)
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(imageObjectState);
    }

    function findKernel(kernel: any, type: string) {
        return kernel.type === type
    }

    useEffect(() => {  }, [kernel])

    return <div className="mt-3">
        <div className="grid grid-cols-3 rounded-lg overflow-hidden border border-gray-700">
            {kernel.map((value: number, key: number) => {
                return <InputKernel key={key} index={JSON.stringify(key)} onChange={onChangeHandle} value={value} />
            })}
        </div>
        <div className="flex justify-end">
            <select className="w-full px-2 mt-4 text-center py-3 rounded-lg cursor-pointer bg-blue-700 text-white"
                onChange={(e: any) => {
                    setTypeKernel(e.target.value);
                    const responseFilter = filter.find((value: any) => findKernel(value, e.target.value))
                    setKernel([...responseFilter.kernel])
                    submitKernelHandle([...responseFilter.kernel], e.target.value);
                }}
            >
                {filter.map((value: any, key: number) => <option key={key} value={value.type}>{value.type}</option>)}
            </select>
        </div>
    </div>
}

function InputKernel({ index, onChange, value }: {
    index: string,
    onChange: any,
    value: number
}) {
    return <input type="text" name={index} placeholder={JSON.stringify(value)} className="placeholder-black py-6 ps-8 pe-3 border border-gray-400 text-lg font-semibold"
        onChange={onChange}
    />
}