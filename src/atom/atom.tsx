import { atom } from "recoil";

const imageAtom: any = atom({
    key: "imageAtom",
    default: {
        width: 0,
        height: 0,
        image: "",
    }
})

const imageObjectAtom: any = atom({
    key: "imageObjectAtom",
    default: {}
})

const fileBackUpAtom: any = atom({
    key: "fileBackUpAtom",
    default: {}
})

const rgbAtom: any = atom({
    key: "rgbAtom",
    default: {
        red: 0,
        blue: 0,
        green: 0
    }
})

const currentFilterAtom: any = atom({
    key: "currentFilter",
    default: ""
})

const enhancersAtom: any = atom({
    key: "enhancersAtom",
    default: {
        opacity: 255,
        brightness: 0,
        saturation: 0,
        blur: 45
    }
})

const blurImageAtom: any = atom({
    key: "blurImageAtom",
    default: 0
})

const filterSelectionAtom: any = atom({
    key: "filterSelectionAtom",
    default: true
})

const toggleAtom: any = atom({
    key: "toggleAtom",
    default: false
})

const singleTresholdAtom: any = atom({
    key: "tresholdAtom",
    default: 0
})

const rangeTresholdAtom: any = atom({
    key: "rangeTresholdAtom",
    default: {
        t1: 0,
        t2: 0
    }
});

const areaImageAtom: any = atom({
    key: "areaImageAtom",
    default: {
        areaOfImage: 0,
        areaOfObject: 0,
        centroidImage: {x:0, y:0},
        centroidObject: {x: 0, y:0}
    }
})

const rotateImageAtom: any = atom({
    key: "rotateImageAtom",
    default: 0
})

const kernelAtom: any = atom({
    key: "kernelAtom",
    default: true
})

export {
    imageAtom,
    imageObjectAtom,
    rgbAtom,
    currentFilterAtom,
    enhancersAtom,
    fileBackUpAtom,
    blurImageAtom,
    filterSelectionAtom,
    toggleAtom,
    singleTresholdAtom,
    rangeTresholdAtom,
    areaImageAtom, 
    rotateImageAtom,
    kernelAtom
}