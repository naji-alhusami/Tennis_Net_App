"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios'
import { toast } from "sonner"

import { SignupAuthValidator, type SignupFormData } from "@/lib/validators/AccountValidators";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { pacifico } from "@/app/fonts";

import { Spinner } from "@/components/ui/spinner"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [signupError, setSignupError] = useState<string | null>(null);

    const form = useForm<SignupFormData>({
        resolver: zodResolver(SignupAuthValidator),
        defaultValues: { name: "", email: "", password: "" },
    });

    const onSubmit = async (values: SignupFormData) => {
        try {
            setIsLoading(true);
            setSignupError(null)

            const response = await axios.post("/api/signup", values);

            toast.success("Signup Successful! Please Check Your Email To Verify Your Account.")
            if (response.data.error) {
                setSignupError(response.data.error);
                return;
            }

            router.push("/auth/login");
        } catch (error) {
            let message = "Something went wrong. Please try again.";

            if (axios.isAxiosError(error)) {
                const data = error.response?.data as { error?: string };
                if (data?.error) {
                    message = data.error;
                }
            }

            setSignupError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg rounded-2xl bg-white/85 backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
            <h1 className={cn("text-green-700 text-6xl pb-20 text-center md:text-7xl", pacifico.className)}>
                Signup
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Your Name" {...field} />
                                </FormControl>
                                <div className="h-5">
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="you@example.com" {...field} />
                                </FormControl>
                                <div className="h-5">
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <div className="h-5">
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <div className="h-2">
                        {signupError && (
                            <p className="text-sm text-red-600 font-bold">
                                {signupError}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className={cn(
                            "cursor-pointer w-full bg-green-600 hover:bg-green-700 font-bold",
                            isLoading && "opacity-70 cursor-not-allowed"
                        )}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Spinner />
                                <span>Please wait...</span>
                            </span>
                        ) : (
                            "Signup"
                        )}
                    </Button>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Already have an account?</p>
                        <Link href="/auth/login">
                            <Button variant="outline" className="cursor-pointer font-semibold">Login</Button>
                        </Link>
                    </div>
                </form>
            </Form>
        </div >
    );
}
