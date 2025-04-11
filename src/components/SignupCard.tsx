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

export default function SignupCard() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        role: "user",
    });
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, formData).then(() => {
            router.push("/login");
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const router = useRouter();
    return (
        <Card className="w-[400px] mx-auto my-8">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Welcome to BookSwap</CardTitle>
                <CardDescription className="text-center">Create an account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                            <Input id="password" name="password" type="password" placeholder="Enter your password" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="mobile">Mobile</Label>
                            <Input id="mobile" name="mobile" placeholder="Enter your mobile number" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="role">Role</Label>
                            <select
                                id="role"
                                name="role"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center pt-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Signing up..." : "Sign Up"}</Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
            </CardFooter>
        </Card>
    )
}
