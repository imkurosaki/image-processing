
export default function BinaryProjection({ img, canvasBinaryVertical, canvasBinaryHorizontal }: {
    img: any,
    canvasBinaryVertical: any,
    canvasBinaryHorizontal: any
}) {
    return <div className="mt-10">
        <p className=" text-xl font-medium mb-4">Binary Projection</p>
        <div className="flex gap-2">
            <div className={`h-[${350}] w-[${400}] p-4 rounded-lg border border-gray-700 overflow-hidden shadow-2xl shadow-black`}>
                <p className=" text-xs font-light mb-4">Horizontal Projection</p>
                <canvas
                    ref={canvasBinaryHorizontal}
                    width={400}
                    height={350}
                >
                </canvas>
            </div>
            <div className={`h-[${350}] w-[${400}] p-4 rounded-lg border border-gray-700 overflow-hidden shadow-2xl shadow-black`}>
                <p className=" text-xs font-light mb-4">Vertical Projection</p>
                <canvas
                    ref={canvasBinaryVertical}
                    width={400}
                    height={350}
                >
                </canvas>
            </div>
        </div>
    </div>
}