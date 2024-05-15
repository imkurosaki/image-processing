

export const getArea = (image: any, ref: any) => {
    const canvas: any = ref;
    canvas.width = image.width;
    canvas.heigth = image.height;

    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.heigth)

    let areaOfImage = image.height * image.width;
    let areaOfObject = 0;

    for (let y: number = 0; y < canvas.height; y++) {
        for (let x: number = 0; x < canvas.width; x++) {
            let index: number = (y * canvas.width + x) * 4;
            let grayscale: number = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
            // let binaryValue: number = grayscale > 128 ? 255 : 0;
            if (grayscale < 128) {
                areaOfObject++;
            }
        }
    }

    return {
        areaOfImage,
        areaOfObject
    }
}

export const getCentroid = (image: any, ref: any) => {
    const canvas: any = ref;
    canvas.width = image.width;
    canvas.heigth = image.height;

    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.heigth)

    let totalX = 0;
    let totalY = 0;
    let count = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
        const pixelValue = imageData.data[i]; // Assuming image is grayscale
        const x = (i / 4) % canvas.width;
        const y = Math.floor((i / 4) / canvas.width);

        // If the pixel is foreground
        if (pixelValue !== 255) {
            totalX += x;
            totalY += y;
            count++;
        }
    }

    const centroidObjectX = totalX / count;
    const centroidObjectY = totalY / count;

    return {
        centroidObjectX,
        centroidObjectY
    }
}

export const markRedCentroid = (image: any, ref: any, centroidX: any, centroidY: any) => {
    const canvas: any = ref;
    canvas.width = image.width;
    canvas.heigth = image.height;

    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    // Draw a red plus sign at the centroid position within the object
    ctx.beginPath();
    ctx.moveTo(centroidX - 5, centroidY);
    ctx.lineTo(centroidX + 5, centroidY);
    ctx.moveTo(centroidX, centroidY - 5);
    ctx.lineTo(centroidX, centroidY + 5);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
}