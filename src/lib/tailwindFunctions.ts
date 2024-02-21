
const changeColor: Function = (color: string): string => {
    if(color === "red") return "bg-red-700";
    if(color === "green") return "bg-green-700";
    if(color === "blue") return "bg-blue-700";
    return "";
}

const getBlur: Function = (blur: number): string => {
    if (blur === 0) return "blur-none";
    if (blur > 0 && blur <= 4) return "blur";
    if (blur > 4 && blur <= 8) return "blur-md";
    if (blur > 8 && blur <= 16) return "blur-lg";
    if (blur > 16 && blur <= 24) return "blur-xl";
    if (blur > 24 && blur <= 40) return "blur-2xl";
    if (blur > 40 && blur <= 64) return "blur-3xl";
    return "blur-none";
}

export {
    changeColor,
    getBlur
}