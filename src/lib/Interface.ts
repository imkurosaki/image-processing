interface IimageProperties {
    width: number,
    height: number,
    imageData: ImageData
}

interface IrgbAtom {
    red: number,
    blue: number,
    green: number
}

interface IenhancersAtom {
    opacity: number,
    brightness: number,
    saturation: number,
    blur: number
}

interface IimageAtom {
    width: number,
    height: number,
    image: File,
}