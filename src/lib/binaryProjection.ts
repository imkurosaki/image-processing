

export const binaryProjection = (image: any, ref: any, verticalRef: any, horizontalRef: any) => {
    const canvas: any = ref;
    canvas.width = image.width;
    canvas.heigth = image.height;

    const verticalCtx: any = verticalRef.getContext('2d');

    const horizontalCtx: any = horizontalRef.getContext('2d');

    const originalCtx: any = canvas.getContext('2d');
    originalCtx.drawImage(image, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, canvas.width, canvas.height);

    const grayscaleImageData = convertToGrayscale(imageData);
    const binaryImageData = threshold(grayscaleImageData, 128);
    const horizontalProjection = computeHorizontalProjection(binaryImageData);
    const verticalProjection = computeVerticalProjection(binaryImageData);
    
    drawProjection(horizontalCtx, horizontalProjection, 'horizontal');
    drawProjection(verticalCtx, verticalProjection, 'vertical');
}

const convertToGrayscale = (imageData: any) => {
    for (let i = 0; i < imageData.data.length; i += 4) {
        const grayscale = Math.round(0.299 * imageData.data[i] + 0.587 * imageData.data[i + 1] + 0.114 * imageData.data[i + 2]);
        imageData.data[i] = grayscale;
        imageData.data[i + 1] = grayscale;
        imageData.data[i + 2] = grayscale;
    }
    return imageData;
}

const threshold = (imageData: any, thresholdValue: any) => {
    for (let i = 0; i < imageData.data.length; i += 4) {
        const grayscale = imageData.data[i];
        const binary = grayscale > thresholdValue ? 255 : 0;
        imageData.data[i] = binary;
        imageData.data[i + 1] = binary;
        imageData.data[i + 2] = binary;
    }
    return imageData;
}

const computeHorizontalProjection = (imageData: any) => {
    const projection = new Array(imageData.height).fill(0);
    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            const index = (y * imageData.width + x) * 4;
            if (imageData.data[index] === 0) {
                projection[y]++;
            }
        }
    }
    return projection;
}

const computeVerticalProjection = (imageData: any) => {
    const projection = new Array(imageData.width).fill(0);
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            const index = (y * imageData.width + x) * 4;
            if (imageData.data[index] === 0) {
                projection[x]++;
            }
        }
    }
    return projection;
}

const drawProjection = (ctx: any, projection: any, direction: any) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = '#FC6736';
    ctx.lineWidth = 5; // Adjust border line width as needed
    if (direction === 'horizontal') {
        const boxHeight = ctx.canvas.height / projection.length;
        projection.forEach((count: any, y:any) => {
            const boxY = y * boxHeight;
            ctx.fillRect(0, boxY, count, boxHeight); // Fill the rectangle
            ctx.strokeRect(0, boxY, count, boxHeight); // Draw the border
            ctx.strokeStyle = '#FC6736'; // Reset stroke style to red for next box
        });
    } else if (direction === 'vertical') {
        const boxWidth = ctx.canvas.width / projection.length;
        projection.forEach((count:any, x:any) => {
            const boxX = x * boxWidth;
            ctx.fillRect(boxX, 0, boxWidth, count); // Fill the rectangle
            ctx.strokeRect(boxX, 0, boxWidth, count); // Draw the border
            ctx.strokeStyle = '#FC6736'; // Reset stroke style to red for next box
        });
    }
}