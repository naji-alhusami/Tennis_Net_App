"use client";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "../ui/button";
import SlowlyShow from "@/components/shared/SlowlyShow";
import TypeWriter from "@/components/shared/TypeWriter";
import Typewriter from "typewriter-effect";
import { cn } from "@/lib/utils";

function WelcomeHome() {
    
    return (
        <div className="relative w-full h-[520px] md:h-[700px] overflow-hidden flex flex-row justify-between items-center">
            {/* TEXT */}
            <div className="relative z-20 mr-8 px-5 md:px-16 py-10 flex flex-col justify-center items-start gap-y-6 lg:gap-y-16 xl:pl-30">
                <div>
                    <div className="min-h-[56px] md:min-h-[80px] flex items-center">
                        <h1 className="text-4xl font-bold md:text-7xl text-white lg:text-black">
                            <div className="flex flex-row lg:hidden">
                                Hi
                                <span className="text-green-400 ml-4">..</span>
                            </div>

                            <div className="hidden lg:flex flex-row">
                                <TypeWriter text="Hi " delay={150} />
                                <span className="text-green-400 ml-4">
                                    <TypeWriter text=" .." delay={150} />
                                </span>
                            </div>
                        </h1>
                    </div>

                    <div className="flex items-center h-[72px] md:h-[80px] lg:h-[64px]">
                        <h1 className="text-green-400 font-bold my-4 text-3xl md:text-4xl lg:hidden leading-tight">
                            <span className="inline-block">
                                <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter
                                            .typeString("Join Our Tennis Club")
                                            .pauseFor(2000)
                                            .deleteAll()
                                            .start();
                                    }}
                                    options={{ loop: true }}
                                />
                            </span>
                        </h1>

                        <h1 className="hidden lg:flex text-green-400 font-bold my-4 text-3xl md:text-4xl leading-tight">
                            Join Our Tennis Club
                        </h1>
                    </div>
                </div>


                <div className="min-h-[80px] lg:min-h-[110px] text-lg font-semibold md:text-2xl text-gray-100 max-w-xl mb-6 lg:text-black">
                    <SlowlyShow text="We invite you to join us in this journey. The court is set, the ball is in your court. Come be a part of TENNIS NET Club." />
                </div>

                <div className="flex flex-col gap-y-4">
                    <Link
                        href="/auth/signup"
                        className={cn(
                            buttonVariants({ size: "lg" }),
                            "border border-white text-white bg-transparent",
                            "lg:bg-primary lg:text-primary-foreground lg:border-transparent"
                        )}
                    >
                        Become A Member →
                    </Link>
                    <Link href="/" className={buttonVariants({ variant: "outline" })}>
                        Contact Us
                    </Link>
                </div>
            </div>

            {/* Video (Desktop) */}
            <div className="hidden lg:flex w-1/2 h-full lg:z-30">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover video-fade-left"
                >
                    <source src="/naji.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Image (Mobile Only) */}
            <div className="absolute inset-0 block lg:hidden w-full h-full brightness-80">
                <Image
                    src="/HomeImage.jpg"
                    alt="home-background"
                    width={1000}
                    height={600}
                    priority
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

export default WelcomeHome;
