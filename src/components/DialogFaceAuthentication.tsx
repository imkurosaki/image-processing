import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/components/ui/dialog"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import { toast } from "@/shadcn/components/ui/use-toast";
import { useGetUsers } from "@/lib/users";
import { userAtom, usersAtom } from "@/atom/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function DialogFaceAuthentication({ children }: {
    children: React.ReactNode
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Face ID Recognition </DialogTitle>
                    <DialogDescription>
                        Please center your face in the camera.
                    </DialogDescription>
                </DialogHeader>
                <VideoCamCanvas />
                <div className="flex justify-end">
                    <DialogClose className="bg-gray-900 text-white px-3 py-2 rounded-md">
                        Cancel
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}


function VideoCamCanvas() {
    const navigate = useNavigate()
    const videoRef: any = useRef();
    const [result, setResult] = useState("Please wait...");
    const dimensions = {
        width: 600,
        height: 400
        // height: 400
    }
    const labels = useGetUsers();
    const usersState = useRecoilValue(usersAtom);
    const setUserState = useSetRecoilState(userAtom)

    useEffect(() => {
        const loadModels = async () => {
            //   const url = "/public/models";
            // await faceapi.loadTinyFaceDetectorModel(url);
            // await faceapi.loadFaceLandmarkTinyModel(url);
            // await faceapi.loadFaceExpressionModel(url);
            // await faceapi.loadFaceRecognitionModel(url);

            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models")
            console.log("Models loaded");
        }

        loadModels();
        getVideo();
    }, []);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: dimensions })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((error) => {
                console.error("error", error);
            });
    }

    const stopVideo = () => {
        const mediaStream = videoRef.current.srcObject;
        if (mediaStream && mediaStream.active) {
            const tracks = mediaStream.getTracks();
            tracks.forEach((track: any) => {
                track.stop();
            });
            videoRef.current.srcObject = null;
        }
    }

    const detect = async () => {
        const refFace = await loadLabeledImages();
        const faceMatcher = new faceapi.FaceMatcher(refFace, 0.6);
        let camInterval: any;


        camInterval = setInterval(async () => {
            console.log("asdasdsad")
            const detection = await faceapi
                .detectSingleFace(
                    videoRef.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks(true)
                .withFaceExpressions()
                .withFaceDescriptor();

            if (detection) {
                const resizedDetections = faceapi.resizeResults(detection, dimensions);
                const result = faceMatcher.findBestMatch(resizedDetections.descriptor);
                setResult(result.toString());
                console.log(result)

                const { _label, _distance }: any = result;
                if (_label === 'unknown') {
                    toast({
                        description: "Face ID doesn't recognize, please register.",
                        className: "bg-red-500 text-white py-3"
                    })
                    console.log("error no username")
                } else {
                    clearInterval(camInterval)

                    //get the user information and stored in the localStorage
                    const user = usersState.filter((user: { username: string, name: string, hashPassword: string }) => {
                        return user.username === _label;
                    })
                    localStorage.setItem("user", JSON.stringify(user))
                    setUserState(user);

                    toast({
                        description: "Face ID is detected, you've successfully login.",
                        className: "bg-green-500 text-white py-3"
                    })

                    const mediaStream = videoRef.current.srcObject;
                    if (mediaStream && mediaStream.active) {
                        const tracks = mediaStream.getTracks();
                        tracks.forEach((track: any) => {
                            track.stop();
                        });
                        videoRef.current.srcObject = null;
                    }
                    stopVideo();
                    navigate("/")
                }
            }
        }, 2000);
    }

    const loadLabeledImages = () => {
        // const labels = ["kean", "harkirat"];

        return Promise.all(
            labels.map(async (label: any) => {
                const descriptions = [];
                for (let i = 1; i < 3; i++) {
                    let loc = `/public/images/${label}/${i}.jpg`;
                    const img = await faceapi.fetchImage(loc);
                    const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
                        .withFaceLandmarks(true)
                        .withFaceExpressions()
                        .withFaceDescriptor();

                    if (detections) {
                        descriptions.push(detections.descriptor);
                    }
                }
                return new faceapi.LabeledFaceDescriptors(label, descriptions);
            })
        )
    };

    return <div className="w-full rounded-lg overflow-auto border border-gray-950">
        <div>
            <video autoPlay muted ref={videoRef} onPlay={detect} />
        </div>
    </div>
}