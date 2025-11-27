import Image from "next/image";

import VerifyEmailForm from "@/components/VerifyEmailForm/VerifyEmailForm";
import { newVerification } from "../../../actions/newVerification";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function VerifyEmailPage(props: {
    searchParams: SearchParams
}) {
    const searchParams = await props.searchParams;
    const token =
        typeof searchParams?.token === "string" ? searchParams.token : undefined;


    let result: { success?: string; error?: string };

    if (!token) {
        result = { error: "No token was provided in the URL." };
    } else {
        result = await newVerification(token);
    }

    return (
        <div className="relative py-35">
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
                <VerifyEmailForm success={result.success} error={result.error} />
            </div>
        </div>
    )
}