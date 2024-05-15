

export const convolutionFilters = (image: any, ref: any, kernel: number[],filter: string) => {
    console.log(kernel)
    console.log(filter)

    const canvas: any = ref;
    canvas.width = image.width;
    canvas.heigth = image.height;

    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.heigth)
    const data = imageData.data;


    let convolutionData: any = [];
    // let kernel: any = [];
    let kernelSum = 0;
    let offSet = 0;

    switch (filter) {
        case "smoothing":
            // kernel = [
            //     1, 1, 1,
            //     1, 2, 1,
            //     1, 1, 1
            // ];
            kernelSum = 10;
            offSet = 0;
            break;
        case "gaussian":
            // kernel = [
            //     1, 2, 3, 2, 1,
            //     2, 4, 5, 4, 2,
            //     3, 5, 6, 5, 3,
            //     2, 4, 5, 4, 2,
            //     1, 2, 3, 2, 1
            // ];
            kernelSum = 74;
            offSet = 0;
            break;
        case "sharpening":
            // kernel = [
            //     0, -1, 0,
            //     -1, 5, -1,
            //     0, -1, 0
            // ];
            kernelSum = 1;
            offSet = 0;
            break;
        case "emboss-laplascian":
            // kernel = [
            //     -1, 0, -1,
            //     0, 4, 0,
            //     -1, 0, -1
            // ];
            kernelSum = 1;
            offSet = 127;
            break;
        case "emboss-horizontal":
            // kernel = [
            //     0, 0, 0,
            //     -1, 2, -1,
            //     0, 0, 0
            // ];
            kernelSum = 1;
            offSet = 127;
            break;
        case "emboss-lossy":
            // kernel = [
            //     1, -2, 1,
            //     -2, 4, -2,
            //     -2, 1, -2
            // ];
            kernelSum = 1;
            offSet = 127;
            break;
        case "mean-removal":
            // kernel = [
            //     -1, -1, -1,
            //     -1, 9, -1,
            //     -1, -1, -1
            // ];
            kernelSum = 1;
            offSet = 0;
            break;
        default:
            kernel = [
                1, 1, 1,
                1, 2, 1,
                1, 1, 1
            ];
            break;
    }

    convolutionData = operationFilter(kernel, kernelSum, offSet, data, canvas.width, canvas.height);

    for (let i = 0; i < data.length; i++) {
        data[i] = convolutionData[i];
    }

    ctx.putImageData(imageData, 0, 0);
}

const operationFilter = (kernel: any, kernelSum: number, offSet: number, data: any, width: any, height: any) => {
    for (let i = 0; i < kernel.length; i++) {
        kernel[i] /= kernelSum;
        // kernel[i] = kernel[i] / 1 + 127;
    }

    const output = new Uint8ClampedArray(data.length);
    const kernelSize = Math.sqrt(kernel.length);
    const halfKernel = Math.floor(kernelSize / 2);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0, a = 0;

            for (let ky = -halfKernel; ky <= halfKernel; ky++) {
                for (let kx = -halfKernel; kx <= halfKernel; kx++) {
                    const px = x + kx;
                    const py = y + ky;

                    if (px >= 0 && px < width && py >= 0 && py < height) {
                        const index = ((py * width) + px) * 4;
                        const weight = kernel[(ky + halfKernel) * kernelSize + (kx + halfKernel)];

                        r += data[index] * weight;
                        g += data[index + 1] * weight;
                        b += data[index + 2] * weight;
                        a += data[index + 3] * weight;
                    }
                }
            }

            const outputIndex = ((y * width) + x) * 4;
            output[outputIndex] = r + offSet;
            output[outputIndex + 1] = g + offSet;
            output[outputIndex + 2] = b + offSet;
            output[outputIndex + 3] = data[outputIndex + 3]; // Preserve alpha channel
        }
    }
    return output;
}

