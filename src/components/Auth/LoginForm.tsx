"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner"
import AuthError from 'next-auth';

import { Button } from "@/components/ui/button";
import { LoginAuthValidator, type LoginFormData } from "@/lib/validators/AccountValidators";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { pacifico } from "@/app/fonts";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";

export default function LoginForm() {
    type LoadingAction = "credentials" | "google" | null;

    const [loadingAction, setLoadingAction] = useState<LoadingAction>(null);
    const [loginError, setLoginError] = useState<string | null>(null);

    const router = useRouter()
    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginAuthValidator),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (values: LoginFormData) => {
        try {
            setLoadingAction("credentials");
            setLoginError(null)

            const response = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (response?.error) {
                switch (response.error) {
                    case "CredentialsSignin":
                        setLoginError("Invalid Email Or Password");
                        break;
                    case "AccessDenied":
                        setLoginError(
                            "Please Confirm Your Email Address"
                        );
                        break;
                    default:
                        setLoginError("Something went wrong. Please try again.");
                }
                return;
            }
            toast.success("Logged in successfully")
            router.push('/user')

        } catch (error) {
            if (error instanceof AuthError) {
                console.log(error);

            }
            console.error("Login error:", error);
            setLoginError("Something went wrong. Please try again.");
        } finally {
            setLoadingAction(null);
        }
    };

    const googleLoginHandler = async () => {
        try {
            setLoadingAction("google");
            await signIn("google", { callbackUrl: "/user" });
        } finally {
            setLoadingAction(null);
        }
    };


    return (
        <div className="w-full max-w-lg rounded-2xl bg-white/85 backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
            <h1 className={cn(
                " text-green-700 text-6xl pb-20 text-center md:text-7xl",
                pacifico.className
            )}>Login</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="you@example.com" autoComplete="email" {...field} />
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
                                    <Input type="password" placeholder="••••••••" autoComplete="current-password" {...field} />
                                </FormControl>
                                <div className="h-5">
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <div className="h-2 text-center">
                        {loginError && (
                            <p className="text-md text-red-600 font-bold">
                                {loginError}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        disabled={loadingAction !== null}
                        className={cn(
                            "cursor-pointer w-full bg-green-600 hover:bg-green-700 font-bold",
                            loadingAction && "opacity-70 cursor-not-allowed",
                        )}
                    >
                        {loadingAction === "credentials" ? (
                            <span className="flex items-center justify-center gap-2">
                                <Spinner />
                                <span>Please wait...</span>
                            </span>
                        ) : (
                            "Login"
                        )}
                    </Button>


                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Don’t have an account?
                        </p>
                        <Link href='/auth/signup' className="cursor-pointer">
                            <Button variant="outline" className="font-semibold cursor-pointer">
                                Signup
                            </Button>
                        </Link>
                    </div>
                    <div className="w-full flex items-center justify-center space-x-2">
                        <Separator className="flex-1 bg-gray-300" />
                        <p className="px-2 text-sm text-gray-500">OR</p>
                        <Separator className="flex-1 bg-gray-300" />
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full font-semibold cursor-pointer flex items-center justify-center gap-2"
                        disabled={loadingAction !== null}
                        onClick={googleLoginHandler}
                    >
                        {loadingAction === "google" ? (
                            <>
                                <Spinner />
                                <span>Please wait ...</span>
                            </>
                        ) : (
                            <>
                                <span>Continue with Google</span>
                                <FcGoogle />
                            </>
                        )}
                    </Button>
                    {/* <Button variant="outline" className="w-full font-semibold cursor-pointer">
                        Continue with Instagram
                        <Instagram size={16} color="#ff00c8" />
                    </Button> */}
                </form>
            </Form>
        </div>
    );
}

