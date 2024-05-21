


import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/shadcn/components/ui/card"
import { Label } from "@/shadcn/components/ui/label"
import { Input } from "@/shadcn/components/ui/input"
import { Button } from "@/shadcn/components/ui/button"
import { useState } from "react"
import { toast } from "@/shadcn/components/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import bcrypt from "bcryptjs";
import { usersAtom } from "@/atom/atom"
import { useRecoilState } from "recoil"

export function RegisterForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [usersState, setUsersState] = useRecoilState(usersAtom);

    return (
        <div className="mt-14 px-48">
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <Label htmlFor="email" className="block text-start">Email or Username</Label>
                    <Input id="email" className="w-full" placeholder="Enter your email or username" type="text" onChange={(e: any) => {
                        setUsername(e.target.value)
                    }} />
                </div>
                <div className="flex justify-between">
                    <Label htmlFor="name" className="block text-start">Name</Label>
                    <Input id="name" className="w-[650px]" placeholder="Enter your name" type="text" onChange={(e: any) => {
                        setName(e.target.value)
                    }} />
                </div>
                <div className="flex justify-between">
                    <Label htmlFor="password" className="block text-start">Password</Label>
                    <Input id="password" className="w-[650px]" placeholder="Enter your password" type="password" onChange={(e: any) => {
                        setPassword(e.target.value)
                    }} />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Button className="w-full" onClick={() => {
                    const user = usersState.filter((user: { username: string, password: string }) => {
                        return user.username === username;
                    })

                    if (user.length) {
                        console.log("none")
                        toast({
                            description: "Email is already exist try another one",
                            action: <ToastAction altText="Try again" className="border border-gray-200 text-sm p-2 rounded-lg hover:bg-slate-950 hover:text-white">Try again</ToastAction>,
                            className: "py-3"
                        })
                    } else {
                        const salt = bcrypt.genSaltSync(10);
                        const hashPassword = bcrypt.hashSync(password, salt);
                        let newUsers = [...usersState, { "username": username, "name": name, password: password, "hashPassword": hashPassword }]
                        localStorage.setItem("users", JSON.stringify(newUsers))
                        toast({
                            description: "Your email is successfully registered",
                            className: "py-4"
                        })
                        setUsersState(newUsers);
                        navigate("/authentication")
                    }
                }}>Sign In</Button>
            </CardFooter>
            <div className=" text-end px-6">
                <Link to="/signin" className=" text-sm underline">Have you already an account? Login</Link>
            </div>
        </div>
    )
}