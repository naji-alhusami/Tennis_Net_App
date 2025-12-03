"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios'
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from "next/navigation";
import { toast } from "sonner"

import { RoleAuthValidator, type RoleFormData } from "@/lib/validators/AccountValidators";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { pacifico } from "@/app/fonts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function RoleForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [roleError, setRoleError] = useState<string | null>(null);

    const form = useForm<RoleFormData>({
        resolver: zodResolver(RoleAuthValidator),
        defaultValues: { role: undefined },
    });

    const onSubmit = async (values: RoleFormData) => {
        try {
            setIsLoading(true);
            setRoleError(null)

            const response = await axios.post("/api/signup", values);

            toast.success("Signup Successful! Please Check Your Email To Verify Your Account.")
            if (response.data.error) {
                setRoleError(response.data.error);
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

            setRoleError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg rounded-2xl bg-white/85 backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
            <h1 className={cn("text-green-700 text-6xl pb-20 text-center md:text-7xl", pacifico.className)}>
                Role
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>What is your role?</FormLabel>

                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
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
                            <p className="text-md text-red-600 font-bold">
                                {roleError}
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
                            "Set Role"
                        )}
                    </Button>
                </form>
            </Form>
        </div >
    );
}
