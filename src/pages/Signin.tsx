import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/shadcn/components/ui/card"
import { Label } from "@/shadcn/components/ui/label"
import { Input } from "@/shadcn/components/ui/input"
import { Button } from "@/shadcn/components/ui/button"
import { useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { toast } from "@/shadcn/components/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { userAtom, usersAtom } from "@/atom/atom"

export default function Signin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const setUserState = useSetRecoilState(userAtom)
    const [usersState, setUsersState] = useRecoilState(usersAtom);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md p-6 bg-white shadow-lg dark:bg-gray-800">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="block text-start">Email or Username</Label>
                        <Input id="email" placeholder="Enter your email or username" type="text" onChange={(e: any) => {
                            setUsername(e.target.value)
                        }} />
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="password" className="block text-start">Password</Label>
                        <Input id="password" placeholder="Enter your password" type="password" onChange={(e: any) => {
                            setPassword(e.target.value)
                        }} />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Button className="w-full" onClick={() => {
                        const user = usersState.filter((user: { username: string, name: string, hashPassword: string }) => {
                            return user.username === username && bcrypt.compareSync(password, user.hashPassword)
                        })

                        if (!user.length) {
                            toast({
                                description: "Incorrect username or password",
                                action: <ToastAction altText="Try again" className="border border-gray-200 bg-red-700 text-sm p-2 rounded-lg hover:text-white hover:bg-red-800">Try again</ToastAction>,
                                className: "bg-gray-900 text-white py-4"
                            })
                        } else {
                            toast({
                                description: "You've successfully login",
                                className: "bg-gray-900 text-white py-4"
                            })
                            localStorage.setItem("user", JSON.stringify(user))
                            setUserState(user);
                            navigate("/")
                        }
                    }}>Sign In</Button>
                </CardFooter>
                <div className=" text-end px-6">
                    <Link to="/register" className=" text-sm underline">Don't have an account yet? Register</Link>
                </div>
            </Card>
        </div>
    )
}