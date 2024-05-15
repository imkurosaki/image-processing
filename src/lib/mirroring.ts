
export const mirroringImage = (image: any, ref: any, type: string) => {
    const canvas: any = ref;
    canvas.width = image.width;
    canvas.heigth = (type === "vertical") ? image.height * 2 : image.height;

    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    ctx.save(); // Save the current transformation matrix

    if (type === "horizontal") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.scale(1, -1); // Flip vertically by scaling
        ctx.drawImage(image, 0, -image.height); // Draw the mirrored image
    }
}