"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { LoginAuthValidator, type LoginFormData } from "@/lib/validators/AccountValidators";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { pacifico } from "@/app/fonts";
import { Separator } from "../ui/separator";

export default function LoginForm() {
    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginAuthValidator),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = (values: LoginFormData) => {
        console.log(values);
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
                                    <Input type="email" placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 font-bold cursor-pointer">
                        Login
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
                    <Button variant="outline" className="w-full font-semibold cursor-pointer">
                        Continue with Google
                        <FcGoogle />
                    </Button>
                    <Button variant="outline" className="w-full font-semibold cursor-pointer">
                        Continue with Google
                        <FcGoogle />
                    </Button>
                </form>
            </Form>
        </div>
    );
}
