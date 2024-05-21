import { RegisterForm } from "@/components/RegisterForm";
import { Button } from "@/shadcn/components/ui/button";
import { useEffect, useRef, useState } from "react"

export default function Register() {
    const videoRef: any = useRef();
    const canvasRef1: any = useRef();
    const canvasRef2: any = useRef();
    const [cam, setCam] = useState(true);
    const [count, setCount] = useState(1);

    useEffect(() => {
        showVideo();
    }, [])

    const showVideo = async () => {
        setCam(true);
        let stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        videoRef.current.srcObject = stream;
    }

    const stopVideo = async () => {
        setCam(false);
        const mediaStream = videoRef.current.srcObject;
        if (mediaStream && mediaStream.active) {
            const tracks = mediaStream.getTracks();
            tracks.forEach((track: any) => {
                track.stop();
            });
            videoRef.current.srcObject = null;
        }
    }

    const captureImage = () => {
        if (count > 2) return;

        if (count === 1) {
            console.log(count)
            canvasRef1.current.getContext('2d').drawImage(videoRef.current, 0, 0, canvasRef1.current.width, canvasRef1.current.height)
        } else {
            canvasRef2.current.getContext('2d').drawImage(videoRef.current, 0, 0, canvasRef2.current.width, canvasRef2.current.height)
        }
        setCount(count => count + 1);
    }

    const downloadImage = () => {
        console.log(count)
        if (count < 2) return
        // canvasRef1.current.getContext('2d').drawImage(videoRef.current, 0, 0, canvasRef1.current.width, canvasRef1.current.height)
        // canvasRef2.current.getContext('2d').drawImage(videoRef.current, 0, 0, canvasRef2.current.width, canvasRef2.current.height)

        const imageDataURL1 = canvasRef1.current.toDataURL("image/jpeg");
        const link1 = document.createElement('a');
        link1.href = imageDataURL1;
        link1.download = `${1}.png`;
        link1.click();

        const imageDataURL2 = canvasRef2.current.toDataURL("image/jpeg");
        const link2 = document.createElement('a');
        link2.href = imageDataURL2;
        link2.download = `${2}.png`;
        link2.click();
    }

    const cancelImage = () => {
        if (count < 2) return 
        setCount(1)
        const canvas1 = canvasRef1.current.getContext('2d');
        const canvas2 = canvasRef2.current.getContext('2d');
        canvas1.clearRect(0, 0, canvasRef1.current.width, canvasRef1.current.height);
        canvas2.clearRect(0, 0, canvasRef2.current.width, canvasRef2.current.height);
    }

    return <div className="px-48 py-12">
        <div className="flex gap-12">
            <div>
                {cam ?
                    <video autoPlay muted ref={videoRef}
                        width={400}
                        height={400}
                        className="rounded-xl border-2 border-gray-700"
                    />
                    :
                    <div className="h-[300px] w-[400px] rounded-xl border-2 border-gray-700 relative">
                        <div className="absolute top-[40%] right-[40%]">
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20">
                                <path d="M15 18.9372C14.0645 18.9771 13.0495 19 12 19C8 19 4.5 18.6667 4 18.3333C3.5 18 3 15.6667 3 13C3 10.7849 3.34499 8.79986 3.7484 8M12 16C10.3431 16 9 14.6569 9 13M3 3L21 21M10 5.16181C10.4888 5.06081 11.1374 5 12 5C17 5 14.8083 7.04298 16 7.11352C18.1268 7.2394 19.6796 7.45303 20 7.66667C20.5 8 21 10.3333 21 13C21 14.0946 20.9158 15.133 20.7819 16" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                }
                <div className="grid grid-cols-12 mt-5">
                    <div className="flex items-center justify-center col-span-11">
                        <div className="p-4 border border-gray-700 rounded-full flex items-center hover:bg-slate-800 hover:text-white cursor-pointer">
                            <CamVideo functionCall={captureImage}>
                                <IconCamera />
                            </CamVideo>
                        </div>
                    </div>
                    <div className="flex items-center col-span-1">
                        {!cam ?
                            <CamVideo functionCall={showVideo}>
                                <IconCamOff />
                            </CamVideo>
                            :
                            <CamVideo functionCall={stopVideo}>
                                <IconCamOn />
                            </CamVideo>
                        }
                    </div>
                </div>
            </div>
            <div className="border border-gray-400 shadow-md p-6 rounded-lg">
                <div className="flex gap-4">
                    <div className=" h-[250px] w-[300px] rounded-lg">
                        <canvas ref={canvasRef1} width="300" height="250" className="rounded-lg"></canvas>
                    </div>
                    <div className=" h-[250px] w-[300px] rounded-lg">
                        <canvas ref={canvasRef2} width="300" height="250" className="rounded-lg"></canvas>
                    </div>
                </div>
                <div className="flex justify-end mt-5 gap-4">
                    <Button variant="outline" onClick={cancelImage}>Cancel</Button>
                    <Button onClick={downloadImage}>Download Images</Button>
                </div>
            </div>
        </div>
        <RegisterForm />
    </div>
}

function CamVideo({ children, functionCall }: {
    children: React.ReactNode,
    functionCall: any
}) {
    return <button onClick={functionCall}>
        {children}
    </button>
}

function IconCamOn() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
    </svg>
}

function IconCamOff() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M.97 3.97a.75.75 0 0 1 1.06 0l15 15a.75.75 0 1 1-1.06 1.06l-15-15a.75.75 0 0 1 0-1.06ZM17.25 16.06l2.69 2.69c.944.945 2.56.276 2.56-1.06V6.31c0-1.336-1.616-2.005-2.56-1.06l-2.69 2.69v8.12ZM15.75 7.5v8.068L4.682 4.5h8.068a3 3 0 0 1 3 3ZM1.5 16.5V7.682l11.773 11.773c-.17.03-.345.045-.523.045H4.5a3 3 0 0 1-3-3Z" />
    </svg>
}

function IconCamera() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
        <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    </svg>
}