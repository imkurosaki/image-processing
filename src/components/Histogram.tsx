
export default function Histogram({canvasHistogramRef}: {
    canvasHistogramRef: any
}) {

    return <div className="mt-6">
        <p className=" text-xl font-medium mb-4">RGB Histogram</p>
        <div className={`h-[300px] w-[600px] p-4 rounded-lg border border-gray-700 overflow-hidden shadow-2xl shadow-black`}>
            <canvas
                ref={canvasHistogramRef}
                width={600}
                height={300}
            >
            </canvas>
        </div>
    </div>
}