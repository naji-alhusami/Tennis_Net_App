"use client"
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import SlowlyShow from "@/lib/SlowlyShow";
import TypeWriter from "@/lib/TypeWriter";
import Typewriter from "typewriter-effect"


function WelcomeHome() {
    return (
        <div className="relative md:flex md:flex-row md:justify-between">
            <div className="hidden md:block relative w-full overflow-hidden">
                <div className="hidden md:relative md:flex w-full h-190">
                    <Image
                        src="/HomeImage.jpg"
                        alt="home-background"
                        width={1000}
                        height={200}
                        priority
                        // style={{
                        //     objectFit: "contain",
                        // }}
                        className="w-full h-80 md:w-full md:h-220 [mask-image:linear-gradient(to_left,black,transparent_40%)] [-webkit-mask-image:linear-gradient(to_left,black,transparent_60%)]"
                    />
                </div>
            </div>
            <div className="absolute left-6 md:left-13 lg:left-14 xl:left-30 pr-10 md:pr-100 lg:pr-140 xl:pr-210 flex flex-col justify-center items-start py-15 md:py-30 gap-y-5 md:gap-y-20 lg:">
                <div className="h-32">
                    <h1 className=" text-4xl font-bold md:text-7xl">
                        <div className="flex flex-row">
                            <TypeWriter text="Hi " delay={50} />
                            <span className="text-green-700 ml-4">
                                <TypeWriter text=" .." delay={50} />
                            </span>
                        </div>
                    </h1>
                    <h1 className="text-green-700 font-bold my-4 text-3xl md:text-4xl">
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
                    </h1>
                </div>
                <div className="h-44 text-lg font-bold py-8 md:text-2xl text-gray-800">
                    <SlowlyShow text="We invite you to join us in this journey. The court is set, the ball is in your court. Come be a part of TENNIS NET Club." />
                </div>
                <div className="h-32 flex flex-col gap-y-4">
                    <Link href="/authentication/signup" className={buttonVariants()}>
                        Become Member &rarr;
                    </Link>
                    <Link href="/" className={buttonVariants({ variant: "outline" })}>
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>)
}

export default WelcomeHome