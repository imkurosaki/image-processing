import DialogFaceAuthentication from "@/components/DialogFaceAuthentication";
import { Button } from "@/shadcn/components/ui/button";
import { Link } from "react-router-dom";

export default function Authentication() {
    return <div className="h-screen flex justify-center items-center">
        <div className="w-[400px] text-center border rounded-lg shadow-md p-6">
            <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.8" stroke="currentColor" className=" text-gray-500 w-32 h-32">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
            </div>
            <div>
                <DialogFaceAuthentication>
                    <Button className="w-full rounded-3xl mb-6">Use Face ID</Button>
                </DialogFaceAuthentication>
                <Link to={"/signin"} className=" text-sm font-semibold">Signin with email</Link>
            </div>
            <Link to={"/register"} className="text-xs text-blue-500 text-left block mt-16">Haven't an account yet?, Register</Link>
        </div>
    </div>
}

