"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
    ProfileValidator,
    type ProfileData,
} from "@/lib/validators/AccountValidators";
import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button";
import { pacifico } from "@/app/fonts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";

export default function ProfileForm() {
    const { data: session } = useSession();
    console.log("session:", session?.user.name)

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [roleError, setRoleError] = useState<string | null>(null);

    const form = useForm<ProfileData>({
        resolver: zodResolver(ProfileValidator),
        defaultValues: { role: undefined },
    });

    const onSubmit = async (values: ProfileData) => {
        try {
            setIsLoading(true);
            setRoleError(null);

            const { data } = await axios.post("/api/profile", {
                role: values.role,
            });

            if (data.error) {
                setRoleError(data.error);
                return;
            }

            // if (data.isOAuth) {
            toast.success("Profile Information Saved Successfully");
            router.push("/user");
            // } else {
            //     toast.success("Signup successful! Please check your email to verify your account.");
            //     router.push("/auth/login");
            // }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.error;
                if (message) {
                    setRoleError(message);
                    return;
                }
            }

            setRoleError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative py-20">
            {/* background image layer */}
            <div className="absolute inset-0 flex justify-center items-center -z-10">
                <div className="relative w-[600px] max-w-[90vw] md:w-[700px] lg:w-[800px]">
                    <Image
                        src="/test.png"
                        alt="auth background"
                        width={800}
                        height={400}
                        className="w-full h-auto object-contain opacity-90 select-none pointer-events-none"
                        priority
                    />
                </div>
            </div>

            {/* overlay content layer */}
            <div className="relative z-10 grid  place-items-center p-4">
                <div className="w-full max-w-lg rounded-2xl bg-white/85 backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
                    <h1
                        className={cn(
                            "text-green-700 text-6xl pb-20 text-center md:text-7xl",
                            pacifico.className
                        )}
                    >
                        Profile
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
                                            <Input type="text" placeholder="Your Name" autoComplete="name" {...field} />
                                        </FormControl>
                                        <div className="h-5">
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>What Is Your Role?</FormLabel>

                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Your Role" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                <SelectItem value="PLAYER">Player</SelectItem>
                                                <SelectItem value="COACH">Coach</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="h-2 text-center">
                                {roleError && (
                                    <p className="text-md text-red-600 font-bold">{roleError}</p>
                                )}
                            </div>

                            <Field>
                                <FieldLabel htmlFor="picture">Picture</FieldLabel>
                                <Input id="picture" type="file" />
                                {/* <FieldDescription>Select a picture to upload.</FieldDescription> */}
                            </Field>

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
                                    "Set Role"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>



    );
}
