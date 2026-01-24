"use client";
import { useId, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pacifico } from "@/app/fonts";

export default function ProfileForm() {
    const fileId = useId()
    const [file, setFile] = useState<File | null>(null)
    const { status, data: session } = useSession();

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [profileError, setProfileError] = useState<string | null>(null);

    const form = useForm<ProfileData>({
        resolver: zodResolver(ProfileValidator),
        defaultValues: { name: "", role: undefined, image: undefined }
    });

    useEffect(() => {
        const name = session?.user?.name

        if (!name) return
        form.setValue("name", name, { shouldValidate: true, shouldDirty: false })

    }, [session?.user?.name, form])

    const onSubmit = async (values: ProfileData) => {
        try {
            setIsLoading(true);
            setProfileError(null);

            const formData = new FormData();
            formData.append("name", values.name);
            if (values.role) {
                formData.append("role", values.role);
            }
            if (values.image) {
                formData.append("image", values.image);
            }

            const { data } = await axios.post("/api/profile", formData);
            // const { data } = await axios.post("/api/profile", {
            //     name: values.name,
            //     role: values.role,
            //     image: values.image
            // });

            if (data.error) {
                setProfileError(data.error);
                return;
            }

            toast.success("Profile Information Saved Successfully");
            router.push("/user");

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.error;
                if (message) {
                    setProfileError(message);
                    return;
                }
            }

            setProfileError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (status === "loading") return null

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
                                        <div className="h-4">
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
                                        <div className="h-4">
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel htmlFor={fileId}>Image</FormLabel>
                                        <input
                                            id={fileId}
                                            type="file"
                                            accept="image/*"
                                            className="sr-only"
                                            onChange={(e) => {
                                                const f = e.target.files?.[0] ?? null
                                                setFile(f)
                                                field.onChange(f)
                                            }}
                                        />
                                        <div
                                            className={cn(
                                                "flex h-10 w-full items-center gap-3 rounded-md border bg-background px-3 text-sm",
                                                fieldState.error &&
                                                "border-red-500 focus-within:ring-1 focus-within:ring-red-500"
                                            )}
                                        >
                                            <Button asChild type="button" variant="outline" size="sm">
                                                <label htmlFor={fileId} className="cursor-pointer">
                                                    Choose file
                                                </label>
                                            </Button>
                                            <span className="text-muted-foreground truncate">
                                                {file ? file.name : "No file chosen"}
                                            </span>
                                        </div>
                                        <div className="h-4">
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <div className="h-2 text-center">
                                {profileError && (
                                    <p className="text-md text-red-600 font-bold">{profileError}</p>
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
                                    "Update Profile"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>



    );
}
