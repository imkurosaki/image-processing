


export const moveImage = (image: any, ref: any, x: number, y: number) => {
    const canvas: any = ref;
    var ctx = canvas.getContext('2d');
    canvas.width = image.width + 200; // Adding some extra width for demonstration
    canvas.height = image.height + 200; // Adding some extra height for demonstration

    // Move the image to (x, y) coordinates
    ctx.drawImage(image, x, y);
}