"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

type VerifyEmailFormProps = {
    success?: string;
    error?: string;
};

export default function VerifyEmailForm({ success, error }: VerifyEmailFormProps) {
    const hasError = !!error && !success;

    if (!success && !error) {
        return (
            <div className="w-full max-w-xl rounded-2xl bg-white/85 backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
                <div className="flex flex-col items-center justify-center gap-y-6">
                    <h1 className="font-bold text-2xl md:text-3xl text-center">
                        Confirming Your Email…
                    </h1>
                    <Spinner className="size-20 text-green-500" />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xl rounded-2xl bg-white/85 backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
            <h1 className="font-bold text-2xl md:text-3xl text-center mb-6">
                {success ? "Your Email Has Been Verified" : "Verification Failed"}
            </h1>

            {success && (
                <p className="text-center text-sm text-green-700 mb-8">
                    {success}
                </p>
            )}

            {hasError && (
                <p className="text-center text-sm text-red-600 mb-8">
                    {error}
                </p>
            )}

            {success && (<Link href="/auth/login">
                <Button className="w-full bg-green-600 hover:bg-green-700 font-bold text-white cursor-pointer">
                    Go to Login
                </Button>
            </Link>)}
        </div>
    );
}
