"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { Users, MapPin, Trophy, CalendarCheck } from "lucide-react";

const stats = [
    { icon: Users, value: 500, label: "Active Members", suffix: "+" },
    { icon: MapPin, value: 8, label: "Tennis Courts", suffix: "" },
    { icon: Trophy, value: 12, label: "Pro Coaches", suffix: "" },
    { icon: CalendarCheck, value: 10, label: "Years of Excellence", suffix: "+" },
];

function CountUp({ value, isActive }: { value: number; isActive: boolean }) {
    const mv = useMotionValue(0);
    const rounded = useTransform(mv, (v) => Math.round(v));

    useEffect(() => {
        if (!isActive) return;
        const controls = animate(mv, value, { duration: 1.5, ease: [0.16, 1, 0.3, 1] });
        return () => controls.stop();
    }, [isActive, value, mv]);

    return <motion.span>{rounded}</motion.span>;
}

export default function Stats() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <section ref={ref} className="bg-green-700 py-16 px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center text-white">
                {stats.map(({ icon: Icon, value, label, suffix }, i) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center gap-3"
                    >
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10">
                            <Icon size={28} className="text-green-200" />
                        </div>
                        <p className="text-4xl font-extrabold tracking-tight">
                            <CountUp value={value} isActive={inView} />
                            {suffix}
                        </p>
                        <p className="text-green-100 text-sm font-medium uppercase tracking-widest">
                            {label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
