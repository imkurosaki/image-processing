const colorShades: any = [
    {
        id: 0,
        color: "none",
        image: "goatOriginal.jpg",
        selected: false
    },
    {
        id: 1,
        color: "grayscale",
        image: "goatGrayscale.png",
        selected: false
    },
    {
        id: 2,
        color: "binary",
        image: "goatBinary.png",
        threshold: 128,
        selected: false
    },
    {
        id: 3,
        color: "sepian",
        image: "goatSepian.png",
        selected: false
    },
    {
        id: 4,
        color: "magenta",
        image: "goatMagenta.png",
        selected: false
    },
    {
        id: 5,
        color: "green",
        image: "goatGreen.png",
        selected: false
    },
    {
        id: 6,
        color: "blue",
        image: "goatBlue.png",
        selected: false
    },
    {
        id: 7,
        color: "red",
        image: "goatRed.png",
        selected: false
    },
    {
        id: 8,
        color: "yellow",
        image: "goatYellow.png",
        selected: false
    },
    {
        id: 9,
        color: "cyan",
        image: "goatCyan.png",
        selected: false
    },
    {
        id: 10,
        color: "invert",
        image: "goatInvert.png",
        selected: false
    }
]

const enhancersFilter = [
    {
        id: 1,
        name: "opacity",
        min: 0,
        max: 255,
        initialValue: 255
    },
    {
        id: 2,
        name: "brightness",
        min: -255,
        max: 255,
        initialValue: 0
    },
    {
        id: 3,
        name: "saturation",
        min: -45,
        max: 45,
        initialValue: 0
    },
    {
        id: 4,
        name: "blur",
        min: 0,
        max: 64,
        initialValue: 0
    }
]


const rgbFilter = [
    {
        id: 1,
        name: "red",
        min: 0,
        max: 255,
        initialValue: 0
    },
    {
        id: 2,
        name: "green",
        min: 0,
        max: 255,
        initialValue: 0
    },
    {
        id: 3,
        name: "blue",
        min: 0,
        max: 255,
        initialValue: 0
    }
]

export {
    colorShades,
    enhancersFilter,
    rgbFilter
}