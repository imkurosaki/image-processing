import { useSetRecoilState } from "recoil"
import { imageAtom, imageObjectAtom, fileBackUpAtom, enhancersAtom, rgbAtom } from "../atom/atom"
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { useState } from "react";

export default function InsertImage() {
    const setImageAtom = useSetRecoilState(imageAtom);
    const setImageObjectAtom = useSetRecoilState(imageObjectAtom);
    const setFileBackUpAtom = useSetRecoilState(fileBackUpAtom)
    const setEnhancersAtom = useSetRecoilState(enhancersAtom);
    const setRgbAtom = useSetRecoilState(rgbAtom);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: any): void => {
        setImageAtom({
            width: 0,
            height: 0,
            image: ""
        });

        setEnhancersAtom({
            opacity: 255,
            brightness: 0,
            saturation: 0,
            blur: 45
        });

        setRgbAtom({
            red: null,
            blue: null,
            green: null
        });

        const file: any = e.target.files[0];
        if (file) {
            setFileBackUpAtom(file);
            setImageObjectAtom(file);
            const reader: any = new FileReader();
            reader.onloadend = (e: any) => {
                const img: any = new Image();
                img.src = e.target.result;

                img.onload = () => {
                    setImageAtom({
                        width: img.width,
                        height: img.height,
                        image: reader.result
                    })
                }
            }
            reader.readAsDataURL(file);

            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                navigate("/dashboard");
            }, 3000);
        }
    }

    return <div className="flex items-center justify-center drop-shadow-lg h-screen w-full">
        <label className="flex gap-7 h-[330px] flex-col w-[800px] items-center justify-center relative border rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-white hover:bg-gray-100 ">
            <p className="text-5xl">Try Edit Your Photo</p>
            <div>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                </div>
                <label className="px-8 py-3 cursor-pointer rounded-lg bg-blue-700 text-white">
                    Upload your Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden" />
                </label>
            </div>

        </label>
        {isLoading &&
            <div className="w-full h-full absolute flex justify-center items-center">
                <div className="w-full h-full z-10 bg-white opacity-75"></div>
                <div className="absolute z-20">
                    <LoadingPage />
                </div>
            </div>
        }
    </div>
}