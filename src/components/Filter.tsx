import { useState } from "react";
import { colorShades } from "../lib/data";
import { rgbAtom } from "../atom/atom";
import { useSetRecoilState } from "recoil";


export default function Filter(props: { colorHandle: Function, originalImage: Function }) {
    const [filterColors, setFilterColors] = useState(colorShades)
    const setRgbAtom = useSetRecoilState(rgbAtom);
    const imageHighlight = (id: number): void => {
        const newColorShades: Array<any> = colorShades.map((color: any) => {
            if (color.id === id) {
                color.selected = true;
            } else {
                color.selected = false;
            }
            return color;
        })
        setFilterColors(newColorShades);
    }

    return <div>
        <div className="grid grid-cols-4 gap-5 p-5 text-center">
            {filterColors.map((shades: any) => {
                if (shades.color === "binary") {
                    return <div key={shades.id}>
                        <button onClick={() => {
                            imageHighlight(shades.id);
                            props.colorHandle(shades.color, shades.threshold)
                        }}
                            className={`${shades.selected && "border-4 border-yellow-400"} rounded-lg col-span-1 shadow-md shadow-gray-700`} >
                            <img src={`/public/${shades.image}`} className="w-20 h-16  hover:border-2 rounded-lg border-black" />
                        </button>

                        <p className="text-sm font-light">{shades.color}</p>
                    </div>
                } if (shades.color === "none") {
                    return <div key={shades.id}>
                        <button onClick={() => {
                            imageHighlight(shades.id);
                            props.originalImage();
                            props.colorHandle(shades.color);
                            setRgbAtom({
                                red: null,
                                blue: null,
                                green: null
                            });
                        }}
                            className={`${shades.selected && "border-4 border-yellow-400"} rounded-lg col-span-1 shadow-md shadow-gray-700`} >
                            <img src={`/public/${shades.image}`} className="w-20 h-16 rounded-lg hover:border-2 border-black" />
                        </button>
                        <p className="text-sm font-light">{shades.color}</p>
                    </div>
                }
                return <div key={shades.id}>
                    <button onClick={() => {
                        imageHighlight(shades.id);
                        props.colorHandle(shades.color)
                    }}
                        className={`${shades.selected && "border-4 border-yellow-400"} rounded-lg col-span-1 shadow-md shadow-gray-700`} >
                        <img src={`/public/${shades.image}`} className="w-20 h-16 rounded-lg hover:border-2 border-black" />
                    </button>
                    <p className="text-sm font-light">{shades.color}</p>
                </div>
            })}
        </div>
    </div>
}