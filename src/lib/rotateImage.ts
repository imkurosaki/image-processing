


export const rotateImage = (image: any, ref: any, degrees: any) => {
    const canvas: any = ref;
    canvas.width = image.width;
    canvas.heigth = image.height;

    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const radians = degrees * Math.PI / 180;
    const width = image.width;
    const height = image.height;

    // Create a new canvas with the rotated dimensions
    canvas.width = Math.abs(Math.cos(radians)) * width + Math.abs(Math.sin(radians)) * height;
    canvas.height = Math.abs(Math.sin(radians)) * width + Math.abs(Math.cos(radians)) * height;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Translate origin to center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Rotate the canvas
    ctx.rotate(degrees * Math.PI / 180);

    // Draw the image
    ctx.drawImage(image, -width / 2, -height / 2);

    return image;
}