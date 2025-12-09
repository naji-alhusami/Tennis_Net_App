// "use client"
// import Image from "next/image";
// import Link from "next/link";
// import { buttonVariants } from "../ui/button";
// import SlowlyShow from "@/components/shared/SlowlyShow";
// import TypeWriter from "@/components/shared/TypeWriter";
// import Typewriter from "typewriter-effect"


// function WelcomeHome() {
//     return (
//         <div className="relative w-full h-[450px] md:h-[700px] overflow-hidden md:flex md:flex-row md:justify-between">

//             {/* Text */}
//             <div className="px-5 py-10 flex flex-col justify-center items-start">
//                 <div className="h-32">
//                     <h1 className=" text-4xl font-bold md:text-7xl">
//                         <div className="flex flex-row">
//                             <TypeWriter text="Hi " delay={50} />
//                             <span className="text-green-700 ml-4">
//                                 <TypeWriter text=" .." delay={50} />
//                             </span>
//                         </div>
//                     </h1>
//                     <h1 className="text-green-700 font-bold my-4 text-3xl md:text-4xl">
//                         <Typewriter
//                             onInit={(typewriter) => {
//                                 typewriter
//                                     .typeString("Join Our Tennis Club")
//                                     .pauseFor(2000)
//                                     .deleteAll()
//                                     .start();
//                             }}
//                             options={{ loop: true }}
//                         />
//                     </h1>
//                 </div>
//                 <div className="h-44 text-lg font-bold py-8 md:text-2xl text-gray-800">
//                     <SlowlyShow text="We invite you to join us in this journey. The court is set, the ball is in your court. Come be a part of TENNIS NET Club." />
//                 </div>
//                 <div className="h-32 flex flex-col gap-y-4">
//                     <Link href="/authentication/signup" className={buttonVariants()}>
//                         Become Member &rarr;
//                     </Link>
//                     <Link href="/" className={buttonVariants({ variant: "outline" })}>
//                         Contact Us
//                     </Link>
//                 </div>
//             </div>

//             {/* Video */}
//             <div className="hidden md:flex md:w-full md:h-full">
//                 <video
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                     preload="none"
//                     className="w-full h-full object-cover "
//                 >
//                     <source src="/naji.mp4" type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>
//             </div>

//             {/* Image */}
//             <div className="relative block w-full md:hidden">
//                 {/* <div className="hidden md:relative md:flex w-full h-190"> */}
//                     <Image
//                         src="/HomeImage.jpg"
//                         alt="home-background"
//                         width={1000}
//                         height={200}
//                         priority
//                         // style={{
//                         //     objectFit: "contain",
//                         // }}
//                         className="w-full h-full md:w-full md:h-220 "
//                     />
//                 {/* </div> */}
//             </div>
//         </div>)
//     // <div className="relative md:flex md:flex-row md:justify-between">
//     {/* <div className="relative md:flex md:flex-row md:justify-between h-[380px] md:h-[480px]"> */ }
//     // <div className="w-full h-full">
//     //     <video
//     //         width="100%"
//     //         height="50%"
//     //         autoPlay
//     //         muted
//     //         loop
//     //         playsInline
//     //         preload="none"
//     //         className="w-full h-full object-cover [mask-image:linear-gradient(to_left,black,transparent_40%)] [-webkit-mask-image:linear-gradient(to_left,black,transparent_80%)]"
//     //     >
//     //         <source src="/naji.mp4" type="video/mp4" />
//     //         Your browser does not support the video tag.
//     //     </video>
//     // </div>
//     {/* <div className="hidden md:block relative w-full overflow-hidden">
//                 <div className="hidden md:relative md:flex w-full h-190">
//                     <Image
//                         src="/HomeImage.jpg"
//                         alt="home-background"
//                         width={1000}
//                         height={200}
//                         priority
//                         // style={{
//                         //     objectFit: "contain",
//                         // }}
//                         className="w-full h-80 md:w-full md:h-220 [mask-image:linear-gradient(to_left,black,transparent_40%)] [-webkit-mask-image:linear-gradient(to_left,black,transparent_60%)]"
//                     />
//                 </div>
//             </div> */}
//     {/* <div className="absolute left-6 md:left-13 lg:left-14 xl:left-30 pr-10 md:pr-100 lg:pr-140 xl:pr-210 flex flex-col justify-center items-start py-15 md:py-30 gap-y-5 md:gap-y-20 lg:">
//                 <div className="h-32">
//                     <h1 className=" text-4xl font-bold md:text-7xl">
//                         <div className="flex flex-row">
//                             <TypeWriter text="Hi " delay={50} />
//                             <span className="text-green-700 ml-4">
//                                 <TypeWriter text=" .." delay={50} />
//                             </span>
//                         </div>
//                     </h1>
//                     <h1 className="text-green-700 font-bold my-4 text-3xl md:text-4xl">
//                         <Typewriter
//                             onInit={(typewriter) => {
//                                 typewriter
//                                     .typeString("Join Our Tennis Club")
//                                     .pauseFor(2000)
//                                     .deleteAll()
//                                     .start();
//                             }}
//                             options={{ loop: true }}
//                         />
//                     </h1>
//                 </div>
//                 <div className="h-44 text-lg font-bold py-8 md:text-2xl text-gray-800">
//                     <SlowlyShow text="We invite you to join us in this journey. The court is set, the ball is in your court. Come be a part of TENNIS NET Club." />
//                 </div>
//                 <div className="h-32 flex flex-col gap-y-4">
//                     <Link href="/authentication/signup" className={buttonVariants()}>
//                         Become Member &rarr;
//                     </Link>
//                     <Link href="/" className={buttonVariants({ variant: "outline" })}>
//                         Contact Us
//                     </Link>
//                 </div>
//             </div> */}
//     // </div>)
// }

// export default WelcomeHome


// -------------------------------


// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { buttonVariants } from "../ui/button";
// import SlowlyShow from "@/components/shared/SlowlyShow";
// // import TypeWriter from "@/components/shared/TypeWriter";
// // import Typewriter from "typewriter-effect";

// function WelcomeHome() {
//     return (
//         <div className="relative w-full md:h-[700px] md:overflow-hidden md:flex md:flex-row md:justify-between">
//             {/* Text */}
//             <div className="absolute px-5 py-10 flex flex-col justify-center items-start z-10">
//                 <div className="h-32">
//                     <h1 className="text-4xl font-bold md:text-7xl">
//                         <div className="flex flex-row">
//                             Hi
//                             {/* <TypeWriter text="Hi " delay={50} /> */}
//                             <span className="text-green-700 ml-4">
//                                 ..
//                                 {/* <TypeWriter text=" .." delay={50} /> */}
//                             </span>
//                         </div>
//                     </h1>
//                     <h1 className="text-green-700 font-bold my-4 text-3xl md:text-4xl">
//                         {/* <Typewriter
//                             onInit={(typewriter) => {
//                                 typewriter
//                                     .typeString("Join Our Tennis Club")
//                                     .pauseFor(2000)
//                                     .deleteAll()
//                                     .start();
//                             }}
//                             options={{ loop: true }}
//                         /> */}
//                         Join Our Tennis Club
//                     </h1>
//                 </div>
//                 <div className="h-44 text-lg font-bold py-8 md:text-2xl text-gray-800">
//                     <SlowlyShow text="We invite you to join us in this journey. The court is set, the ball is in your court. Come be a part of TENNIS NET Club." />
//                 </div>
//                 <div className="h-32 flex flex-col gap-y-4">
//                     <Link href="/authentication/signup" className={buttonVariants()}>
//                         Become Member &rarr;
//                     </Link>
//                     <Link href="/" className={buttonVariants({ variant: "outline" })}>
//                         Contact Us
//                     </Link>
//                 </div>
//             </div>

//             {/* Video (md and up) */}
//             <div className="hidden md:flex md:w-full md:h-full">
//                 <video
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                     preload="none"
//                     className="w-full h-full object-cover"
//                 >
//                     <source src="/naji.mp4" type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>
//             </div>

//             {/* Image (small screens only) */}
//             <div className="relative block w-full md:hidden">
//                 <Image
//                     src="/HomeImage.jpg"
//                     alt="home-background"
//                     width={1000}
//                     height={200}
//                     priority
//                     className="w-full h-full"
//                 />
//             </div>
//         </div>
//     );
// }

// export default WelcomeHome;



// --------------------

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

                    {/* "Join Our Tennis Club" line */}
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
            <div className="hidden lg:flex w-1/2 h-full md:z-30">
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
