
const colorOptions: Function = (image: ImageData, ref: any, color: string, enhancer: IenhancersAtom, rgbAtomState?: IrgbAtom, inputThreshold?: number): void => {
    const canvas: any = ref;
    canvas.width = image.width;
    canvas.heigth = image.height;

    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.heigth)

    const imageProperties: IimageProperties = {
        width: image.width,
        height: image.height,
        imageData: imageData,
    }

    switch (color) {
        case "binary":
            inputThreshold = inputThreshold || 128;
            ctx.putImageData(binary(imageProperties, inputThreshold, enhancer), 0, 0);
            break;
        case "grayscale":
            ctx.putImageData(grayScale(imageProperties, enhancer), 0, 0);
            break;
        case "sepian":
            ctx.putImageData(sepian(imageProperties, rgbAtomState, enhancer), 0, 0);
            break;
        case "magenta":
            ctx.putImageData(rgb(imageProperties, { red: 255, blue: 255 }, rgbAtomState, enhancer), 0, 0);
            break;
        case "green":
            ctx.putImageData(rgb(imageProperties, { red: 0, blue: 0 }, rgbAtomState, enhancer), 0, 0);
            break;
        case "blue":
            ctx.putImageData(rgb(imageProperties, { red: 0, blue: 255 }, rgbAtomState, enhancer), 0, 0);
            break;
        case "red":
            ctx.putImageData(rgb(imageProperties, { red: 255, blue: 0 }, rgbAtomState, enhancer), 0, 0);
            break;
        case "cyan":
            ctx.putImageData(cyan(imageProperties, enhancer), 0, 0);
            break;
        case "yellow":
            ctx.putImageData(yellow(imageProperties, enhancer), 0, 0);
            break;
        case "invert":
            ctx.putImageData(invert(imageProperties, rgbAtomState, enhancer), 0, 0);
            break;
        case "none":
            ctx.putImageData(original(imageProperties, enhancer), 0, 0);
            break;
        default:
            return canvas.toDataURL();
    }
}

const original: Function = (imageProperties: IimageProperties, enhancer: IenhancersAtom): ImageData => {
    const { width, height, imageData } = imageProperties;
    const { data } = imageData;

    for (let y: number = 0; y < height; y++) {
        for (let x: number = 0; x < width; x++) {
            let index: number = (y * width + x) * 4;

            data[x] = 255 - data[x];
            data[x + 1] = 255 - data[x + 1];
            data[x + 2] = 255 - data[x + 2];
            data[index + 3] = enhancer.opacity;
        }
    }
    saturation(imageProperties, enhancer.saturation);
    brightness(imageProperties, enhancer.brightness);

    return imageData
}

const binary: Function = (imageProperties: IimageProperties, threshold: number, enhancer: IenhancersAtom): ImageData => {
    const { width, height, imageData } = imageProperties;
    const { data } = imageData;

    for (let y: number = 0; y < height; y++) {
        for (let x: number = 0; x < width; x++) {
            let index: number = (y * width + x) * 4;
            let grayscale: number = (data[index] + data[index + 1] + data[index + 2]) / 3;
            let binaryValue: number = grayscale > threshold ? 255 : 0;

            data[index] = binaryValue;
            data[index + 1] = binaryValue;
            data[index + 2] = binaryValue;
            data[index + 3] = enhancer.opacity;
        }
    }
    saturation(imageProperties, enhancer.saturation);
    brightness(imageProperties, enhancer.brightness);

    return imageData
}

const grayScale: Function = (imageProperties: IimageProperties, enhancer: IenhancersAtom): ImageData => {
    const { width, height, imageData } = imageProperties;
    const { data } = imageData;

    for (let y: number = 0; y < height; y++) {
        for (let x: number = 0; x < width; x++) {
            let index: number = (y * width + x) * 4;
            let average: number = (data[index] + data[index + 1] + data[index + 2]) / 3;

            data[index] = average;
            data[index + 1] = average;
            data[index + 2] = average;
            data[index + 3] = enhancer.opacity;
        }
    }
    saturation(imageProperties, enhancer.saturation);
    brightness(imageProperties, enhancer.brightness);

    return imageData
}

const sepian: Function = (imageProperties: IimageProperties, stateColor: IrgbAtom, enhancer: IenhancersAtom): ImageData => {
    const { width, height, imageData } = imageProperties;
    const { data } = imageData;
    const red: number = stateColor.red || 255;
    const blue: number = stateColor.blue || 255;
    const green: number = stateColor.green || 255;

    for (let y: number = 0; y < height; y++) {
        for (let x: number = 0; x < width; x++) {
            // Calculate the index of the current pixel
            let index: number = (y * width + x) * 4;

            // Apply sepia formula
            let tr: number = 0.393 * data[index] + 0.769 * data[index + 1] + 0.189 * data[index + 2];
            let tg: number = 0.349 * data[index] + 0.686 * data[index + 1] + 0.168 * data[index + 2];
            let tb: number = 0.272 * data[index] + 0.534 * data[index + 1] + 0.131 * data[index + 2];

            // Set red, green, and blue channels to sepia values
            data[index] = tr < red ? tr : 255;
            data[index + 1] = tg < green ? tg : 255;
            data[index + 2] = tb < blue ? tb : 255;
            data[index + 3] = enhancer.opacity;
        }
    }
    saturation(imageProperties, enhancer.saturation);
    brightness(imageProperties, enhancer.brightness);

    return imageData
}

const rgb: Function = (imageProperties: IimageProperties, color: any, stateColor: IrgbAtom, enhancer: IenhancersAtom): ImageData => {
    const { width, height, imageData } = imageProperties;
    const { data } = imageData;
    const red: number = stateColor.red || color.red;
    const blue: number = stateColor.blue || color.blue;

    for (let y: number = 0; y < height; y++) {
        for (let x: number = 0; x < width; x++) {
            let index: number = (y * width + x) * 4;

            // Set red and blue channels to maximum (255) while keeping green channel unchanged
            data[index] = red;
            data[index + 1] = data[index + 1]; // Leave green unchanged
            data[index + 2] = blue;
            data[index + 3] = enhancer.opacity;
        }
    }
    saturation(imageProperties, enhancer.saturation);
    brightness(imageProperties, enhancer.brightness);

    return imageData
}

const yellow: Function = (imageProperties: IimageProperties, enhancer: IenhancersAtom): ImageData => {
    const { width, height, imageData } = imageProperties;
    const { data } = imageData;

    for (let y: number = 0; y < height; y++) {
        for (let x: number = 0; x < width; x++) {
            let index: number = (y * width + x) * 4;

            // Set red and blue channels to maximum (255) while keeping green channel unchanged
            data[index] = data[index];
            data[index + 1] = data[index + 1];
            data[index + 2] *= 0.5;
            data[index + 3] = enhancer.opacity;
        }
    }
    saturation(imageProperties, enhancer.saturation);
    brightness(imageProperties, enhancer.brightness);

    return imageData
}

const cyan: Function = (imageProperties: IimageProperties, enhancer: IenhancersAtom): ImageData => {
    const { width, height, imageData } = imageProperties;
    const { data } = imageData;

    for (let y: number = 0; y < height; y++) {
        for (let x: number = 0; x < width; x++) {
            let index: number = (y * width + x) * 4;

            data[index] *= 0.8;
            data[index + 1] = data[index + 1]; // Leave green unchanged
            data[index + 2] *= 1.2;
            data[index + 3] = enhancer.opacity;
        }
    }
    saturation(imageProperties, enhancer.saturation);
    brightness(imageProperties, enhancer.brightness);

    return imageData
}

const invert: Function = (imageProperties: IimageProperties, stateColor: IrgbAtom, enhancer: IenhancersAtom): ImageData => {
    const { width, height, imageData } = imageProperties;
    const { data } = imageData;
    const red: number = stateColor.red || 255;
    const blue: number = stateColor.blue || 255;
    const green: number = stateColor.green || 255;

    for (let y: number = 0; y < height; y++) {
        for (let x: number = 0; x < width; x++) {
            let index: number = (y * width + x) * 4;

            data[index] = red - data[index];
            data[index + 1] = blue - data[index + 1];
            data[index + 2] = green - data[index + 2];
            data[index + 3] = enhancer.opacity;
        }
    }
    saturation(imageProperties, enhancer.saturation);
    brightness(imageProperties, enhancer.brightness);

    return imageData
}

const brightness: Function = (imageProperties: IimageProperties, brightness: number): void => {
    const { width, height, imageData } = imageProperties;
    const { data } = imageData;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = (y * width + x) * 4;

            data[index] += brightness;
            data[index + 1] += brightness;
            data[index + 2] += brightness;
        }
    }
}

const saturation: Function = (imageProperties: IimageProperties, saturation: number): void => {
    const { width, height, imageData } = imageProperties;
    const { data } = imageData;

    for (let y: number = 0; y < height; y++) {
        for (let x: number = 0; x < width; x++) {
            let index: number = (y * width + x) * 4;

            let red: number = data[index];
            let green: number = data[index + 1];
            let blue: number = data[index + 2];

            let gray: number = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

            let r: number = (1 - saturation / 100) * red + saturation / 100 * gray;
            let g: number = (1 - saturation / 100) * green + saturation / 100 * gray;
            let b: number = (1 - saturation / 100) * blue + saturation / 100 * gray;

            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
        }
    }
}

export {
    colorOptions
}
