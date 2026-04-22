"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CTASection() {
    return (
        <section className="relative py-28 overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/background1.jpg"
                    alt=""
                    fill
                    className="object-cover brightness-40"
                />
            </div>
            <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto flex flex-col items-center gap-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-extrabold leading-tight"
                >
                    Ready to Ace Your Game?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg text-gray-200 max-w-xl"
                >
                    Join Tennis Net Club today and unlock access to premium courts, expert coaching, and a thriving community of players.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <Link
                        href="/auth/signup"
                        className="inline-flex items-center px-8 py-4 rounded-lg bg-green-500 hover:bg-green-400 active:scale-[0.98] text-white font-bold text-lg transition-all shadow-xl"
                    >
                        Join Us Today →
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
