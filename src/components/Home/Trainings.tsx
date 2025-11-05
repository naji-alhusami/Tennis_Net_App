"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, animate, useMotionValue, useTransform, type Variants } from "framer-motion";

import Header from "../ui/header";
import { TrainingLevelsData } from "./TrainingsData";

export default function Trainings() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(rootRef, { once: true, margin: "-20% 0px -20% 0px" });

    function CountUp({
        value,
        start = 0,
        duration = 1.2,
        isActive = false,
    }: { value: number; start?: number; duration?: number; isActive: boolean }) {
        const mv = useMotionValue(start);
        const rounded = useTransform(mv, (v) => Math.round(v));

        useEffect(() => {
            if (!isActive) return;
            const controls = animate(mv, value, { duration, ease: [0.16, 1, 0.3, 1] });
            return () => controls.stop();
        }, [isActive, value, duration, mv]);

        return <motion.span>{rounded}</motion.span>;
    }

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
        hidden: { opacity: 0, x: -24 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <div className="flex flex-row gap-x-4 px-10 lg:px-25">
            {/* Images */}
            <motion.div variants={slideInLeft} className="hidden lg:flex lg:flex-row lg:justify-center lg:items-center">
                <div className="mr-2">
                    <Image
                        className="lg:h-[30rem] xl:h-[29rem] w-auto object-cover rounded-2xl shadow"
                        src="/player1.jpg"
                        width={500}
                        height={480}
                        alt="player1"
                        priority
                    />
                </div>
                <div className="ml-2">
                    <Image
                        className="lg:h-[30rem] xl:h-[29rem] w-auto object-cover rounded-2xl shadow"
                        src="/player2.jpg"
                        width={500}
                        height={480}
                        alt="player2"
                    />
                </div>
            </motion.div>
            <motion.div
                ref={rootRef}
                variants={container}
                initial="hidden"
                animate={inView ? "visible" : "hidden"} className="px-6 md:px-0 py-16 md:py-20 flex flex-col">
                <motion.div variants={fadeUp} className="w-full mb-4">
                    <Header
                        H3Header="Never Too Late"
                        H1Header="TRAINING"
                        H2Header="Certified Coaches"
                        PHeader="We offer beginner, intermediate, and advanced courses. Join us to elevate your game and enjoy the sport of tennis to the fullest!"
                    />
                </motion.div>
                {/* Images */}
                <motion.div variants={slideInLeft} className="flex flex-row justify-center items-center lg:hidden">
                    <div className="mr-2">
                        <Image
                            className="lg:h-[30rem] xl:h-[29rem] w-auto object-cover rounded-2xl shadow"
                            src="/player1.jpg"
                            width={500}
                            height={480}
                            alt="player1"
                            priority
                        />
                    </div>
                    <div className="ml-2">
                        <Image
                            className="lg:h-[30rem] xl:h-[29rem] w-auto object-cover rounded-2xl shadow"
                            src="/player2.jpg"
                            width={500}
                            height={480}
                            alt="player2"
                        />
                    </div>
                </motion.div>
                {/* Bars */}
                <div className="w-full">
                    {TrainingLevelsData.map((training, idx) => (
                        <div
                            key={training.id}
                            className="w-full h-6 bg-gray-500/60 relative my-6 rounded"
                        >
                            {/* Fill bar */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={inView ? { width: `${training.width}%` } : { width: 0 }}
                                transition={{ duration: 0.9, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
                                className={`absolute inset-y-0 left-0 flex items-center justify-between px-3 text-white rounded ${training.style}`}
                            >
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                    transition={{ duration: 0.5, delay: 0.12 * idx, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-sm font-medium"
                                >
                                    {training.courseType}
                                </motion.p>

                                <div className="flex items-center gap-1 text-sm font-semibold">
                                    <CountUp value={training.percent} isActive={inView} />
                                    <span>%</span>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link
                        href="/training"
                        className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] transition rounded-md px-4 py-2 text-white font-medium shadow-sm"
                    >
                        Check Training Offers →
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}