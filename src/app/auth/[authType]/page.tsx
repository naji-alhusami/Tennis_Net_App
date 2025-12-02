import Image from "next/image";
import LoginForm from "@/components/Auth/LoginForm";
import SignupForm from "@/components/Auth/SignupForm";

export default async function AuthPage({
    params,
}: { params: Promise<{ authType: string }> }) {
    const { authType } = await params;

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
                {authType === "signup" ? <SignupForm /> : <LoginForm />}
            </div>
        </div>
    );
}
