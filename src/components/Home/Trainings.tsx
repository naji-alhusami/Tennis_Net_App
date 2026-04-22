"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";

import Header from "../ui/header";
import { TrainingLevelsData } from "./TrainingsData";

export default function Trainings() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(rootRef, { once: true, margin: "-15% 0px" });

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { when: "beforeChildren", staggerChildren: 0.12 },
        },
    };

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
    };

    const slideInLeft: Variants = {
        hidden: { opacity: 0, x: -32 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <section className="py-20 md:py-28 px-6 md:px-16 xl:px-30 bg-white">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
                {/* Images — desktop left, mobile above text */}
                <motion.div
                    variants={slideInLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-15% 0px" }}
                    className="flex flex-row gap-3 lg:shrink-0"
                >
                    <Image
                        className="h-72 md:h-[26rem] lg:h-[30rem] w-auto object-cover rounded-2xl shadow-md"
                        src="/player1.jpg"
                        width={500}
                        height={480}
                        alt="Tennis player"
                        priority
                    />
                    <Image
                        className="h-72 md:h-[26rem] lg:h-[30rem] w-auto object-cover rounded-2xl shadow-md mt-6"
                        src="/player2.jpg"
                        width={500}
                        height={480}
                        alt="Tennis player"
                    />
                </motion.div>

                {/* Content */}
                <motion.div
                    ref={rootRef}
                    variants={container}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="flex flex-col gap-6 w-full"
                >
                    <motion.div variants={fadeUp}>
                        <Header
                            H3Header="Never Too Late"
                            H1Header="TRAINING"
                            H2Header="Certified Coaches"
                            PHeader="We offer beginner, intermediate, and advanced courses. Join us to elevate your game and enjoy the sport of tennis to the fullest!"
                        />
                    </motion.div>

                    {/* Progress bars */}
                    <div className="w-full flex flex-col gap-5">
                        {TrainingLevelsData.map((training, idx) => (
                            <div key={training.id} className="w-full">
                                <div className="flex justify-between text-sm font-semibold text-gray-600 mb-1.5">
                                    <span>{training.courseType}</span>
                                    <span>{training.percent}%</span>
                                </div>
                                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={inView ? { width: `${training.width}%` } : { width: 0 }}
                                        transition={{ duration: 1, delay: 0.12 * idx, ease: [0.16, 1, 0.3, 1] }}
                                        className="h-full bg-green-600 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link
                            href="/training"
                            className="block w-full text-center bg-green-600 hover:bg-green-700 active:scale-[0.99] transition-all rounded-lg px-4 py-3 text-white font-semibold shadow-sm"
                        >
                            Check Training Offers →
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
