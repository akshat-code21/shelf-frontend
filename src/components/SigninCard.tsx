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
import { useState } from "react"

export default function SigninCard() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/signin`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => {
            router.push("/dashboard");
        }).catch((err) => {
            console.error('Signin error:', err);
        }).finally(() => {
            setIsLoading(false);
        });
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const router = useRouter();
    return (
        <Card className="w-[400px] mx-auto my-8">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Welcome back to BookSwap</CardTitle>
                <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" placeholder="Enter your email" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="Enter your password" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="flex justify-center pt-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Signing in..." : "Sign In"}</Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
            </CardFooter>
        </Card>
    )
}

