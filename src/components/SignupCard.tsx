"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react"

export default function SignupCard() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, formData).then((res) => {
            console.log(res);
            router.push("/login");
        });
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const router = useRouter();
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Welcome to BookSwap</CardTitle>
                <CardDescription>Create an account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder="Enter your name" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" placeholder="Enter your email" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" placeholder="Enter your password" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="mobile">Mobile</Label>
                            <Input id="mobile" name="mobile" placeholder="Enter your mobile number" onChange={handleChange} />
                        </div>
                    </div>
                    <Button type="submit">Sign Up</Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
            </CardFooter>
        </Card>
    )
}
